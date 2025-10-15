import constants from "../../constants/messages";

const wrapError = (error: unknown, prefix: string): Error => {
  if (error instanceof Error) {
    return new Error(`${prefix}: ${error.message}`);
  }
  return new Error(
    `${prefix}: ${constants.ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR}`
  );
};

const isRateLimitError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return (
    message.includes(constants.ERROR_KEYWORDS.QUOTA) ||
    message.includes(constants.ERROR_KEYWORDS.RATE_LIMIT)
  );
};

export { wrapError, isRateLimitError };
