import axios from "axios";
import constants from "../../constants/messages";
import {
  GoogleCalendarListResponse,
  CalendarEvent,
} from "../../types/calendar";
import { IUser } from "../../models/User";
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
    const timeMin = new Date(startDate).toISOString();
    const timeMax = new Date(endDate).toISOString();

    const response = await axios.get<GoogleCalendarListResponse>(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events`,
      {
        ...createAxiosConfig(accessToken),
        params: {
          timeMin,
          timeMax,
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

const getCalendarEvents = async (
  user: IUser,
  startDate: string,
  endDate: string
): Promise<{ events: CalendarEvent[]; tokenRefreshed: boolean }> => {
  const { data: events, tokenRefreshed } = await withTokenRefresh(
    user,
    (accessToken) => fetchCalendarEvents(accessToken, startDate, endDate)
  );

  return { events, tokenRefreshed };
};

export { getCalendarEvents };
