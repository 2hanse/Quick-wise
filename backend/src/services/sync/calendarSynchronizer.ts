import { IUser } from "../../models/User";
import { Event } from "../../models/Event";
import { getCalendarEvents } from "../calendar/calendarReader";
import categorizeEvent from "../categorization/eventCategorizer";
import constants from "../../constants/messages";
import { processEventImmediately } from "../ai/eventProcessor";

const isToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return targetDate.getTime() === today.getTime();
};

const syncCalendarEvents = async (
  user: IUser,
  startDate: string,
  endDate: string
): Promise<{ tokenRefreshed: boolean }> => {
  try {
    const { events: googleEvents, tokenRefreshed } = await getCalendarEvents(
      user,
      startDate,
      endDate
    );

    const googleEventIds = googleEvents.map((event) => event.id);
    const processedEventIds: string[] = [];

    for (const googleEvent of googleEvents) {
      const eventData = {
        userId: user._id,
        googleEventId: googleEvent.id,
        title: googleEvent.title,
        startTime: new Date(googleEvent.startTime),
        endTime: new Date(googleEvent.endTime),
        location: googleEvent.location,
        description: googleEvent.description,
        isAllDay: googleEvent.isAllDay,
        status: googleEvent.status,
        category: categorizeEvent(
          googleEvent.title,
          googleEvent.description,
          googleEvent.location
        ),
        lastSyncedAt: new Date(),
      };

      const result = await Event.updateOne(
        {
          userId: user._id,
          googleEventId: googleEvent.id,
        },
        { $set: eventData },
        { upsert: true }
      );

      if (result.upsertedId || result.modifiedCount > 0) {
        if (isToday(eventData.startTime) && eventData.category) {
          const event = await Event.findOne({
            userId: user._id,
            googleEventId: googleEvent.id,
          });

          if (event) {
            processedEventIds.push(event._id.toString());
          }
        }
      }
    }

    await Event.updateMany(
      {
        userId: user._id,
        googleEventId: { $nin: googleEventIds },
        startTime: { $gte: new Date(startDate) },
        endTime: { $lte: new Date(endDate) },
        status: { $ne: constants.GOOGLE_CALENDAR.EVENT_STATUS.CANCELLED },
      },
      {
        $set: {
          status: constants.GOOGLE_CALENDAR.EVENT_STATUS.CANCELLED,
          lastSyncedAt: new Date(),
        },
      }
    );

    if (processedEventIds.length > 0) {
      setImmediate(() => {
        processedEventIds.forEach((eventId) => {
          processEventImmediately(eventId).catch((error) => {
            console.error(
              `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.EVENT_PROCESSING_FAILED}: ${eventId}`,
              error
            );
          });
        });
      });
    }

    return { tokenRefreshed };
  } catch (error) {
    console.error(constants.LOG_PREFIXES.CALENDAR_SYNC, error);
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.SYNC_FAILED);
  }
};

export { syncCalendarEvents };
