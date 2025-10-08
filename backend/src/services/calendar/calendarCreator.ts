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
import { isTokenExpiredError } from "./helpers/errorValidator";
import { refreshGoogleAccessToken } from "./tokenManager";

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
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": constants.HTTP.CONTENT_TYPE_JSON,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED);
      }

      if (status === 403) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED);
      }

      if (status === 400) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.INVALID_EVENT_DATA);
      }

      if (status && status >= 500) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR);
      }
      throw new Error(constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR);
    }
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_CREATE_EVENT);
  }
};

const createCalendarEvent = async (
  user: IUser,
  eventData: CreateEventRequest
): Promise<{ event: CalendarEvent; tokenRefreshed: boolean }> => {
  if (!user.googleAccessToken) {
    throw new Error(
      constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND
    );
  }

  try {
    const googleEvent = await createEventInGoogle(
      user.googleAccessToken,
      eventData
    );
    const event = convertToCalendarEvent(googleEvent);
    return { event, tokenRefreshed: false };
  } catch (error) {
    if (!isTokenExpiredError(error)) {
      throw error;
    }

    if (!user.googleRefreshToken) {
      throw new Error(
        constants.ERROR_MESSAGES.GOOGLE_AUTH.REFRESH_TOKEN_NOT_FOUND
      );
    }

    const { accessToken, expiresIn } = await refreshGoogleAccessToken(
      user.googleRefreshToken
    );

    user.googleAccessToken = accessToken;
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setSeconds(tokenExpiresAt.getSeconds() + expiresIn);
    user.tokenExpiresAt = tokenExpiresAt;
    await user.save();

    const googleEvent = await createEventInGoogle(accessToken, eventData);
    const event = convertToCalendarEvent(googleEvent);
    return { event, tokenRefreshed: true };
  }
};

export { createCalendarEvent };
