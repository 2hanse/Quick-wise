import { create } from "zustand";
import { CalendarState, CreateEventRequest } from "../types/calendar";
import {
  fetchCalendarEvents,
  createCalendarEvent,
} from "../services/calendarService";
import CALENDAR_CONSTANTS from "../constants/calendar";

const useCalendarStore = create<CalendarState>((set, get) => ({
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

  createEvent: async (eventData: CreateEventRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createCalendarEvent(eventData);
      const currentEvents = get().events;
      set({
        events: [...currentEvents, response.event],
        isLoading: false,
      });
    } catch (error) {
      console.error(CALENDAR_CONSTANTS.LOG_PREFIXES.CREATE_ERROR, error);
      set({
        error: CALENDAR_CONSTANTS.MESSAGES.ERROR_CREATE_EVENT,
        isLoading: false,
      });
    }
  },

  clearEvents: () => {
    set({ events: [], error: null });
  },
}));

export default useCalendarStore;
