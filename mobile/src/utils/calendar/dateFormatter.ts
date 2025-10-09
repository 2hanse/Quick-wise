const formatEventDateTime = (
  selectedDate: string,
  time: string,
  isAllDay: boolean
): string => {
  if (isAllDay) {
    return `${selectedDate}T00:00:00+09:00`;
  }

  return time || `${selectedDate}T09:00:00+09:00`;
};

const formatEndDateTime = (
  selectedDate: string,
  time: string,
  isAllDay: boolean
): string => {
  if (isAllDay) {
    return `${selectedDate}T23:59:59+09:00`;
  }

  return time || `${selectedDate}T10:00:00+09:00`;
};

export { formatEventDateTime, formatEndDateTime };
