import { create } from "zustand";
import {
  CalendarStateWithCache,
  CreateEventRequest,
  UpdateEventRequest,
  CalendarEvent,
} from "../types/calendar";
import {
  fetchCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../services/calendarService";
import CALENDAR_CONSTANTS from "../constants/calendar";

const getCacheKey = (startDate: string, endDate: string): string => {
  return `${startDate}_${endDate}`;
};

const useCalendarStore = create<CalendarStateWithCache>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,
  cache: {},

  getCachedEvents: (startDate: string, endDate: string) => {
    const key = getCacheKey(startDate, endDate);
    const cached = get().cache[key];

    if (!cached) {
      return null;
    }

    const now = Date.now();
    const isExpired =
      now - cached.timestamp > CALENDAR_CONSTANTS.CACHE.DURATION;

    if (isExpired) {
      return null;
    }

    return cached.events;
  },

  setCachedEvents: (
    startDate: string,
    endDate: string,
    events: CalendarEvent[]
  ) => {
    const key = getCacheKey(startDate, endDate);
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: {
          events,
          timestamp: Date.now(),
        },
      },
    }));
  },

  clearCache: () => {
    set({ cache: {} });
  },

  fetchEvents: async (
    startDate: string,
    endDate: string,
    forceRefresh: boolean = false
  ) => {
    const cachedEvents = get().getCachedEvents(startDate, endDate);

    if (!forceRefresh && cachedEvents) {
      set({ events: cachedEvents, isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await fetchCalendarEvents(startDate, endDate);
      set({ events: response.events, isLoading: false });
      get().setCachedEvents(startDate, endDate, response.events);
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
      get().clearCache();
    } catch (error) {
      console.error(CALENDAR_CONSTANTS.LOG_PREFIXES.CREATE_ERROR, error);
      set({
        error: CALENDAR_CONSTANTS.MESSAGES.ERROR_CREATE_EVENT,
        isLoading: false,
      });
    }
  },

  updateEvent: async (eventId: string, eventData: UpdateEventRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateCalendarEvent(eventId, eventData);
      const currentEvents = get().events;
      set({
        events: currentEvents.map((event) =>
          event.id === eventId ? response.event : event
        ),
        isLoading: false,
      });
      get().clearCache();
    } catch (error) {
      console.error(CALENDAR_CONSTANTS.LOG_PREFIXES.UPDATE_ERROR, error);
      set({
        error: CALENDAR_CONSTANTS.MESSAGES.ERROR_UPDATE_EVENT,
        isLoading: false,
      });
    }
  },

  deleteEvent: async (eventId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteCalendarEvent(eventId);
      const currentEvents = get().events;
      set({
        events: currentEvents.filter((event) => event.id !== eventId),
        isLoading: false,
      });
      get().clearCache();
    } catch (error) {
      console.error(CALENDAR_CONSTANTS.LOG_PREFIXES.DELETE_ERROR, error);
      set({
        error: CALENDAR_CONSTANTS.MESSAGES.ERROR_DELETE_EVENT,
        isLoading: false,
      });
    }
  },

  clearEvents: () => {
    set({ events: [], error: null });
  },
}));

export default useCalendarStore;
