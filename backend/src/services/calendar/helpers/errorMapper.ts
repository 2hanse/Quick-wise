import axios from "axios";
import constants from "../../../constants/messages";

const mapGoogleErrorToMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS;
  }

  const status = error.response?.status;

  if (status === 401) {
    return constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED;
  }

  if (status === 403) {
    return constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED;
  }

  if (status === 404) {
    return constants.ERROR_MESSAGES.CALENDAR.EVENT_NOT_FOUND;
  }

  if (status === 400) {
    return constants.ERROR_MESSAGES.CALENDAR.INVALID_EVENT_DATA;
  }

  if (status && status >= 500) {
    return constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR;
  }

  return constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR;
};

export { mapGoogleErrorToMessage };
