import constants from "../constants/messages";

const validateDateRange = (startDate: string, endDate: string): void => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE);
  }

  if (start > end) {
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE);
  }
};

export default validateDateRange;
