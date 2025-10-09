import constants from "../../../constants/messages";
import { mapGoogleErrorToMessage } from "./errorMapper";

const createAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": constants.HTTP.CONTENT_TYPE_JSON,
  },
});

const handleGoogleApiError = (
  error: unknown,
  defaultMessage: string
): never => {
  const errorMessage = mapGoogleErrorToMessage(error);
  throw new Error(
    errorMessage === constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS
      ? defaultMessage
      : errorMessage
  );
};

export { createAxiosConfig, handleGoogleApiError };
