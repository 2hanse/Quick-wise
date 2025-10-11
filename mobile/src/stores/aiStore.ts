import { create } from "zustand";
import { AIState } from "../types/ai";
import {
  fetchTodayAIContent,
  fetchEventAIContent,
} from "../services/aiService";
import AI_CONSTANTS from "../constants/ai";

const useAIStore = create<AIState>((set) => ({
  todayEvents: [],
  selectedEvent: null,
  isLoading: false,
  error: null,

  fetchTodayAIContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchTodayAIContent();
      set({ todayEvents: response.events, isLoading: false });
    } catch (error) {
      console.error(AI_CONSTANTS.LOG_PREFIXES.FETCH_TODAY_ERROR, error);
      set({
        error: AI_CONSTANTS.MESSAGES.ERROR_FETCH_TODAY,
        isLoading: false,
      });
    }
  },

  fetchEventAIContent: async (eventId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchEventAIContent(eventId);
      set({ selectedEvent: response.event, isLoading: false });
    } catch (error) {
      console.error(AI_CONSTANTS.LOG_PREFIXES.FETCH_EVENT_ERROR, error);
      set({
        error: AI_CONSTANTS.MESSAGES.ERROR_FETCH_EVENT,
        isLoading: false,
      });
    }
  },

  clearSelectedEvent: () => {
    set({ selectedEvent: null, error: null });
  },
}));

export default useAIStore;
