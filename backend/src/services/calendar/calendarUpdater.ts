import axios from "axios";
import constants from "../../constants/messages";
import {
  GoogleCalendarEvent,
  CalendarEvent,
  UpdateEventRequest,
  GoogleCreateEventRequest,
} from "../../types/calendar";
import { IUser } from "../../models/User";
import {
  convertToCalendarEvent,
  convertToGoogleTimeFormat,
} from "./helpers/dataConverter";
import { isTokenExpiredError } from "./helpers/errorValidator";
import { refreshGoogleAccessToken } from "./tokenManager";

const updateEventInGoogle = async (
  accessToken: string,
  eventId: string,
  eventData: UpdateEventRequest
): Promise<GoogleCalendarEvent> => {
  try {
    const requestBody: GoogleCreateEventRequest = {
      summary: eventData.title,
      start: convertToGoogleTimeFormat(eventData.startTime, eventData.isAllDay),
      end: convertToGoogleTimeFormat(eventData.endTime, eventData.isAllDay),
      location: eventData.location,
      description: eventData.description,
    };

    const response = await axios.put<GoogleCalendarEvent>(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events/${eventId}`,
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

      if (status === 404) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.EVENT_NOT_FOUND);
      }

      if (status === 400) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.INVALID_EVENT_DATA);
      }

      if (status && status >= 500) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR);
      }
      throw new Error(constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR);
    }
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_UPDATE_EVENT);
  }
};

const updateCalendarEvent = async (
  user: IUser,
  eventId: string,
  eventData: UpdateEventRequest
): Promise<{ event: CalendarEvent; tokenRefreshed: boolean }> => {
  if (!user.googleAccessToken) {
    throw new Error(
      constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND
    );
  }

  try {
    const googleEvent = await updateEventInGoogle(
      user.googleAccessToken,
      eventId,
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

    const googleEvent = await updateEventInGoogle(
      accessToken,
      eventId,
      eventData
    );
    const event = convertToCalendarEvent(googleEvent);
    return { event, tokenRefreshed: true };
  }
};

export { updateCalendarEvent };
