import { IUser } from "../../models/User";
import { Event } from "../../models/Event";
import { getCalendarEvents } from "../calendar/calendarReader";
import constants from "../../constants/messages";

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
        lastSyncedAt: new Date(),
      };

      await Event.updateOne(
        {
          userId: user._id,
          googleEventId: googleEvent.id,
        },
        { $set: eventData },
        { upsert: true }
      );
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

    return { tokenRefreshed };
  } catch (error) {
    console.error(constants.LOG_PREFIXES.CALENDAR_SYNC, error);
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.SYNC_FAILED);
  }
};

export { syncCalendarEvents };
