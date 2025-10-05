import axios from "axios";
import constants from "../constants/messages";
import {
  GoogleCalendarEvent,
  GoogleCalendarListResponse,
  CalendarEvent,
  EventStatus,
} from "../types/calendar";

const fetchCalendarEvents = async (
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<CalendarEvent[]> => {
  try {
    const response = await axios.get<GoogleCalendarListResponse>(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          timeMin: new Date(startDate).toISOString(),
          timeMax: new Date(endDate).toISOString(),
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
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED);
      }

      if (status === 403) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED);
      }

      if (status && status >= 500) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR);
      }
      throw new Error(constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR);
    }
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS);
  }
};

const convertToCalendarEvent = (
  googleEvent: GoogleCalendarEvent
): CalendarEvent => {
  const isAllDay = !googleEvent.start.dateTime;
  const startTime = googleEvent.start.dateTime || googleEvent.start.date || "";
  const endTime = googleEvent.end.dateTime || googleEvent.end.date || "";
  const status = (googleEvent.status ||
    constants.GOOGLE_CALENDAR.EVENT_STATUS.CONFIRMED) as EventStatus;
  return {
    id: googleEvent.id,
    title: googleEvent.summary || constants.GOOGLE_CALENDAR.DEFAULT_TITLE,
    startTime,
    endTime,
    location: googleEvent.location,
    description: googleEvent.description,
    isAllDay,
    status,
  };
};

export { fetchCalendarEvents };
