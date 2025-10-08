import axios from "axios";
import constants from "../../constants/messages";
import { IUser } from "../../models/User";
import { withTokenRefresh } from "./helpers/tokenRefreshHandler";
import {
  createAxiosConfig,
  handleGoogleApiError,
} from "./helpers/googleApiClient";

const deleteEventInGoogle = async (
  accessToken: string,
  eventId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${constants.GOOGLE_CALENDAR.API_BASE_URL}/calendars/${constants.GOOGLE_CALENDAR.DEFAULT_CALENDAR_ID}/events/${eventId}`,
      createAxiosConfig(accessToken)
    );
  } catch (error) {
    return handleGoogleApiError(
      error,
      constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_DELETE_EVENT
    );
  }
};

const deleteCalendarEvent = async (
  user: IUser,
  eventId: string
): Promise<{ tokenRefreshed: boolean }> => {
  const { tokenRefreshed } = await withTokenRefresh(user, (accessToken) =>
    deleteEventInGoogle(accessToken, eventId)
  );

  return { tokenRefreshed };
};

export { deleteCalendarEvent };
