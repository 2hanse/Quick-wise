import axios from "axios";
import constants from "../../constants/messages";
import { IUser } from "../../models/User";
import { isTokenExpiredError } from "./helpers/errorValidator";
import { refreshGoogleAccessToken } from "./tokenManager";

const deleteEventInGoogle = async (
  accessToken: string,
  eventId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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

      if (status && status >= 500) {
        throw new Error(constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR);
      }
      throw new Error(constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR);
    }
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_DELETE_EVENT);
  }
};

const deleteCalendarEvent = async (
  user: IUser,
  eventId: string
): Promise<{ tokenRefreshed: boolean }> => {
  if (!user.googleAccessToken) {
    throw new Error(
      constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND
    );
  }

  try {
    await deleteEventInGoogle(user.googleAccessToken, eventId);
    return { tokenRefreshed: false };
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

    await deleteEventInGoogle(accessToken, eventId);
    return { tokenRefreshed: true };
  }
};

export { deleteCalendarEvent };
