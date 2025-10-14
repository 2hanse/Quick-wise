import axios from "axios";
import constants from "../../constants/messages";
import {
  GoogleCalendarListResponse,
  CalendarEvent,
  EventCategory,
} from "../../types/calendar";
import { IUser } from "../../models/User";
import { Event } from "../../models/Event";
import { convertToCalendarEvent } from "./helpers/dataConverter";
import { withTokenRefresh } from "./helpers/tokenRefreshHandler";
import {
  createAxiosConfig,
  handleGoogleApiError,
} from "./helpers/googleApiClient";

const fetchCalendarEvents = async (
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<CalendarEvent[]> => {
  try {
    const response = await axios.get<GoogleCalendarListResponse>(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events`,
      {
        ...createAxiosConfig(accessToken),
        params: {
          timeMin: startDate,
          timeMax: endDate,
          maxResults: constants.GOOGLE_CALENDAR.DEFAULT_MAX_RESULTS,
          singleEvents: constants.GOOGLE_CALENDAR.SINGLE_EVENTS,
          orderBy: constants.GOOGLE_CALENDAR.ORDER_BY,
        },
      }
    );

    const events = response.data.items || [];
    return events
      .filter(
        (event) =>
          event.status !== constants.GOOGLE_CALENDAR.EVENT_STATUS.CANCELLED
      )
      .map(convertToCalendarEvent);
  } catch (error) {
    return handleGoogleApiError(
      error,
      constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS
    );
  }
};

const isValidCategory = (
  category: string | undefined
): category is EventCategory =>
  category === "meeting" || category === "presentation";

const enrichEventsWithAIContent = async (
  userId: string,
  events: CalendarEvent[]
): Promise<CalendarEvent[]> => {
  const eventIds = events.map((event) => event.id);
  const dbEvents = await Event.find({
    userId,
    googleEventId: { $in: eventIds },
  }).select("googleEventId category aiContent");

  return events.map((event) => {
    const dbEvent = dbEvents.find((db) => db.googleEventId === event.id);
    const category =
      dbEvent?.category && isValidCategory(dbEvent.category)
        ? dbEvent.category
        : undefined;
    return { ...event, category, aiContent: dbEvent?.aiContent };
  });
};

const getCalendarEvents = async (
  user: IUser,
  startDate: string,
  endDate: string
): Promise<{ events: CalendarEvent[]; tokenRefreshed: boolean }> => {
  const { data: events, tokenRefreshed } = await withTokenRefresh(
    user,
    (accessToken) => fetchCalendarEvents(accessToken, startDate, endDate)
  );

  const enrichedEvents = await enrichEventsWithAIContent(
    user._id.toString(),
    events
  );
  return { events: enrichedEvents, tokenRefreshed };
};

export { getCalendarEvents };
