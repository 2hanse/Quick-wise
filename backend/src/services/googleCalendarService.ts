import axios from "axios";
import constants from "../constants/messages";
import {
  GoogleCalendarEvent,
  GoogleCalendarListResponse,
  CalendarEvent,
  EventStatus,
  GoogleTokenRefreshResponse,
} from "../types/calendar";
import { IUser } from "../models/User";

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

const refreshGoogleAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        constants.ERROR_MESSAGES.GOOGLE_AUTH.CLIENT_ID_NOT_DEFINED
      );
    }

    const response = await axios.post<GoogleTokenRefreshResponse>(
      constants.GOOGLE_OAUTH.TOKEN_URL,
      {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: constants.GOOGLE_OAUTH.GRANT_TYPE_REFRESH,
      },
      {
        headers: {
          "Content-Type": constants.GOOGLE_OAUTH.CONTENT_TYPE_FORM,
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
    };
  } catch (error) {
    console.error(constants.LOG_PREFIXES.TOKEN_REFRESH, error);
    throw new Error(constants.ERROR_MESSAGES.GOOGLE_AUTH.TOKEN_REFRESH_FAILED);
  }
};

const isTokenExpiredError = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.message === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED
  );
};

const getCalendarEvents = async (
  user: IUser,
  startDate: string,
  endDate: string
): Promise<{ events: CalendarEvent[]; tokenRefreshed: boolean }> => {
  if (!user.googleAccessToken) {
    throw new Error(
      constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND
    );
  }
  try {
    const events = await fetchCalendarEvents(
      user.googleAccessToken,
      startDate,
      endDate
    );
    return { events, tokenRefreshed: false };
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

    const events = await fetchCalendarEvents(accessToken, startDate, endDate);
    return { events, tokenRefreshed: true };
  }
};

export { fetchCalendarEvents, getCalendarEvents };
