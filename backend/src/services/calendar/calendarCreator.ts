import axios from "axios";
import constants from "../../constants/messages";
import {
  GoogleCalendarEvent,
  CalendarEvent,
  CreateEventRequest,
  GoogleCreateEventRequest,
} from "../../types/calendar";
import { IUser } from "../../models/User";
import {
  convertToCalendarEvent,
  convertToGoogleTimeFormat,
} from "./helpers/dataConverter";
import { withTokenRefresh } from "./helpers/tokenRefreshHandler";
import {
  createAxiosConfig,
  handleGoogleApiError,
} from "./helpers/googleApiClient";

const createEventInGoogle = async (
  accessToken: string,
  eventData: CreateEventRequest
): Promise<GoogleCalendarEvent> => {
  try {
    const requestBody: GoogleCreateEventRequest = {
      summary: eventData.title,
      start: convertToGoogleTimeFormat(eventData.startTime, eventData.isAllDay),
      end: convertToGoogleTimeFormat(eventData.endTime, eventData.isAllDay),
      location: eventData.location,
      description: eventData.description,
    };

    const response = await axios.post<GoogleCalendarEvent>(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events`,
      requestBody,
      createAxiosConfig(accessToken)
    );

    return response.data;
  } catch (error) {
    return handleGoogleApiError(
      error,
      constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_CREATE_EVENT
    );
  }
};

const createCalendarEvent = async (
  user: IUser,
  eventData: CreateEventRequest
): Promise<{ event: CalendarEvent; tokenRefreshed: boolean }> => {
  const { data: googleEvent, tokenRefreshed } = await withTokenRefresh(
    user,
    (accessToken) => createEventInGoogle(accessToken, eventData)
  );

  const event = convertToCalendarEvent(googleEvent);
  return { event, tokenRefreshed };
};

export { createCalendarEvent };
