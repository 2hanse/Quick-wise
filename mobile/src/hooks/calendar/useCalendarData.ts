import { useEffect, useMemo, useCallback } from "react";
import useCalendarStore from "../../stores/calendarStore";
import { getMonthRange } from "../../utils/dateUtils";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const useCalendarData = (currentMonth: Date) => {
  const { CATEGORY_COLORS } = CALENDAR_CONSTANTS;
  const { events, isLoading, error, fetchEvents } = useCalendarStore();

  const { startDate, endDate } = useMemo(() => {
    return getMonthRange(currentMonth);
  }, [currentMonth]);

  useEffect(() => {
    fetchEvents(startDate, endDate, false);
  }, [startDate, endDate, fetchEvents]);

  const refresh = useCallback(async () => {
    await fetchEvents(startDate, endDate, true);
  }, [fetchEvents, startDate, endDate]);

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
    refresh,
  };
};

export default useCalendarData;
