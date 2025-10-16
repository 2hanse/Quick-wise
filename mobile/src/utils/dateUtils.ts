import DATE_UTILS_CONSTANTS from "../constants/dateUtils";
import { DateCell } from "../types/calendar";

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateToRFC3339 = (date: Date, isEndOfDay = false): string => {
  const d = new Date(date);
  if (isEndOfDay) {
    d.setHours(23, 59, 59, 999);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return d.toISOString();
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isSameDate = (selectedDate: Date, currentDate: Date): boolean => {
  return (
    selectedDate.getDate() === currentDate.getDate() &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getFullYear() === currentDate.getFullYear()
  );
};

const getMonthDates = (year: number, month: number): DateCell[] => {
  const dates: DateCell[] = [];
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthDays - i);
    dates.push({
      date,
      dateString: formatDateString(date),
      isCurrentMonth: false,
      isToday: isToday(date),
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    dates.push({
      date,
      dateString: formatDateString(date),
      isCurrentMonth: true,
      isToday: isToday(date),
    });
  }

  const remainingCells = DATE_UTILS_CONSTANTS.CALENDAR_GRID_SIZE - dates.length;
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(year, month + 1, day);
    dates.push({
      date,
      dateString: formatDateString(date),
      isCurrentMonth: false,
      isToday: isToday(date),
    });
  }

  return dates;
};

const getMonthRange = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return {
    startDate: formatDateToRFC3339(startDate, false),
    endDate: formatDateToRFC3339(endDate, true),
  };
};

const getTodayString = (): string => {
  const now = new Date();
  return formatDateString(now);
};

export {
  getMonthDates,
  formatDateString,
  formatDateToRFC3339,
  isToday,
  isSameDate,
  getMonthRange,
  getTodayString,
};
