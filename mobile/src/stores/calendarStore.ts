import { create } from "zustand";
import { CalendarState } from "../types/calendar";
import fetchCalendarEvents from "../services/calendarService";
import CALENDAR_CONSTANTS from "../constants/calendar";

const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async (startDate: string, endDate: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchCalendarEvents(startDate, endDate);
      set({ events: response.events, isLoading: false });
    } catch (error) {
      console.error(CALENDAR_CONSTANTS.LOG_PREFIXES.FETCH_ERROR, error);
      set({
        error: CALENDAR_CONSTANTS.MESSAGES.ERROR_FETCH_EVENTS,
        isLoading: false,
      });
    }
  },
  clearEvents: () => {
    set({ events: [], error: null });
  },
}));

export default useCalendarStore;
