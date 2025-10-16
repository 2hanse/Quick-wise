import { useEffect, useMemo } from "react";
import useCalendarStore from "../../stores/calendarStore";
import { getMonthRange } from "../../utils/dateUtils";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const useCalendarData = (currentMonth: Date) => {
  const { CATEGORY_COLORS } = CALENDAR_CONSTANTS;
  const { events, isLoading, error, fetchEvents } = useCalendarStore();

  useEffect(() => {
    const { startDate, endDate } = getMonthRange(currentMonth);
    fetchEvents(startDate, endDate);
  }, [currentMonth, fetchEvents]);

  const markedDates = useMemo(() => {
    const marked: Record<string, { dots: Array<{ color: string }> }> = {};

    events.forEach((event) => {
      const dateKey = event.startTime.split("T")[0];
      const color = event.category
        ? CATEGORY_COLORS[event.category]
        : "#3b82f6";

      if (marked[dateKey]) {
        marked[dateKey].dots.push({ color });
      } else {
        marked[dateKey] = {
          dots: [{ color }],
        };
      }
    });

    return marked;
  }, [events, CATEGORY_COLORS]);

  return {
    events,
    isLoading,
    error,
    markedDates,
  };
};

export default useCalendarData;
