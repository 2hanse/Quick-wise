import constants from "../../../constants/messages";

const isTokenExpiredError = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.message === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED
  );
};

export { isTokenExpiredError };
