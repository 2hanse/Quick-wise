import { create } from "zustand";
import {
  HomeState,
  TodaySchedule,
  NextSchedule,
  DateInfo,
} from "../types/main";
import { fetchTodayEvents } from "../services/calendarService";
import {
  convertToTodaySchedules,
  createDateInfo,
  getNextSchedule,
} from "../utils/mainscreen/calendarEventConverter";
import mainPageConstants from "../constants/main";

const useHomeStore = create<HomeState>((set, get) => ({
  todaySchedules: [],
  nextSchedule: null,
  dateInfo: createDateInfo(0),
  isLoading: false,
  error: null,
  cache: null,

  getCachedSchedules: () => {
    const cached = get().cache;
    if (!cached) return null;

    const today = new Date().toISOString().split("T")[0];

    if (cached.date !== today) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - cached.timestamp > mainPageConstants.CACHE.DURATION;

    if (isExpired) {
      return null;
    }

    return cached;
  },

  setCachedSchedules: (
    schedules: TodaySchedule[],
    next: NextSchedule | null,
    dateInfo: DateInfo
  ) => {
    const today = new Date().toISOString().split("T")[0];
    set({
      cache: {
        todaySchedules: schedules,
        nextSchedule: next,
        dateInfo,
        timestamp: Date.now(),
        date: today,
      },
    });
  },

  clearCache: () => {
    set({ cache: null });
  },

  fetchTodaySchedules: async (forceRefresh: boolean = false) => {
    const cached = get().getCachedSchedules();

    if (!forceRefresh && cached) {
      set({
        todaySchedules: cached.todaySchedules,
        nextSchedule: cached.nextSchedule,
        dateInfo: cached.dateInfo,
        isLoading: false,
      });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await fetchTodayEvents();
      const schedules = convertToTodaySchedules(response.events);
      const next = getNextSchedule(response.events);
      const dateInfo = createDateInfo(schedules.length);

      set({
        todaySchedules: schedules,
        nextSchedule: next,
        dateInfo,
        isLoading: false,
      });

      get().setCachedSchedules(schedules, next, dateInfo);
    } catch (error) {
      console.error(
        `${mainPageConstants.LOG_PREFIXES.MAIN_SCREEN} ${mainPageConstants.LOG_MESSAGES.FAILED_TO_LOAD}:`,
        error
      );
      set({
        error: mainPageConstants.TEXT.ERROR_LOAD_FAILED,
        todaySchedules: [],
        nextSchedule: null,
        dateInfo: createDateInfo(0),
        isLoading: false,
      });
    }
  },
}));

export default useHomeStore;
