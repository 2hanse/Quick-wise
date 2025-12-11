import { useState, useEffect, useCallback, useRef } from "react";
import { fetchTodayEvents } from "../../services/calendarService";
import {
  convertToTodaySchedules,
  createDateInfo,
  getNextSchedule,
} from "../../utils/mainscreen/calendarEventConverter";
import {
  TodaySchedule,
  DateInfo,
  NextSchedule,
  SwipeContent,
} from "../../types/main";
import mainPageConstants from "../../constants/main";
import useAIStore from "../../stores/aiStore";
import { convertAICardsToSwipeContents } from "../../utils/ai/aiContentConverter";

const useMainSchedule = () => {
  const [todaySchedules, setTodaySchedules] = useState<TodaySchedule[]>([]);
  const [nextSchedule, setNextSchedule] = useState<NextSchedule | null>(null);
  const [dateInfo, setDateInfo] = useState<DateInfo>(createDateInfo(0));
  const [swipeContents, setSwipeContents] = useState<SwipeContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingCountRef = useRef(0);

  const {
    todayEvents,
    fetchTodayAIContent,
    isLoading: aiLoading,
  } = useAIStore();

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    pollingCountRef.current = 0;
  }, []);

  const startPolling = useCallback(() => {
    stopPolling();

    pollingIntervalRef.current = setInterval(async () => {
      pollingCountRef.current += 1;

      if (pollingCountRef.current >= mainPageConstants.POLLING.MAX_ATTEMPTS) {
        stopPolling();
        return;
      }

      await fetchTodayAIContent();
    }, mainPageConstants.POLLING.INTERVAL_MS);
  }, [fetchTodayAIContent, stopPolling]);

  const loadTodaySchedules = useCallback(async () => {
    try {
      setError(null);

      const response = await fetchTodayEvents();
      const schedules = convertToTodaySchedules(response.events);
      const next = getNextSchedule(response.events);

      setTodaySchedules(schedules);
      setNextSchedule(next);
      setDateInfo(createDateInfo(schedules.length));

      await fetchTodayAIContent();
    } catch (error) {
      console.error(
        `${mainPageConstants.LOG_PREFIXES.MAIN_SCREEN} ${mainPageConstants.LOG_MESSAGES.FAILED_TO_LOAD}:`,
        error
      );
      setError(mainPageConstants.TEXT.ERROR_LOAD_FAILED);
      setTodaySchedules([]);
      setNextSchedule(null);
      setDateInfo(createDateInfo(0));
    }
  }, [fetchTodayAIContent]);

  const refresh = useCallback(async () => {
    await loadTodaySchedules();
  }, [loadTodaySchedules]);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await loadTodaySchedules();
      setIsLoading(false);
    };

    initialize();

    return () => {
      stopPolling();
    };
  }, [loadTodaySchedules, stopPolling]);

  useEffect(() => {
    if (todayEvents.length > 0 && nextSchedule) {
      const nextEvent = todayEvents.find(
        (event) =>
          event.title.trim().toLowerCase() ===
          nextSchedule.title.trim().toLowerCase()
      );

      if (nextEvent) {
        setNextSchedule((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            aiContent: nextEvent.aiContent,
          };
        });

        if (
          nextEvent.aiContent?.status === mainPageConstants.AI_STATUS.PROCESSING
        ) {
          startPolling();
        } else {
          stopPolling();
        }

        if (nextEvent.aiContent?.cards) {
          const converted = convertAICardsToSwipeContents(
            nextEvent.aiContent.cards
          );
          setSwipeContents(converted);
        } else {
          setSwipeContents([]);
        }
      }
    }
  }, [todayEvents, nextSchedule?.title, startPolling, stopPolling]);

  return {
    todaySchedules,
    nextSchedule,
    dateInfo,
    swipeContents,
    isLoading: isLoading || aiLoading,
    error,
    refresh,
  };
};

export default useMainSchedule;
