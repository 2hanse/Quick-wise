import { useState, useEffect, useCallback, useRef } from "react";
import { SwipeContent } from "../../types/main";
import mainPageConstants from "../../constants/main";
import useAIStore from "../../stores/aiStore";
import useHomeStore from "../../stores/homeStore";
import { convertAICardsToSwipeContents } from "../../utils/ai/aiContentConverter";

const useMainSchedule = () => {
  const {
    todaySchedules,
    nextSchedule,
    dateInfo,
    isLoading,
    error,
    fetchTodaySchedules,
  } = useHomeStore();

  const [swipeContents, setSwipeContents] = useState<SwipeContent[]>([]);

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

  const refresh = useCallback(async () => {
    await fetchTodaySchedules(true);
    await fetchTodayAIContent();
  }, [fetchTodaySchedules, fetchTodayAIContent]);

  useEffect(() => {
    const initialize = async () => {
      await fetchTodaySchedules(false);
      await fetchTodayAIContent();
    };

    initialize();

    return () => {
      stopPolling();
    };
  }, []);

  useEffect(() => {
    if (todayEvents.length > 0 && nextSchedule) {
      const nextEvent = todayEvents.find(
        (event) =>
          event.title.trim().toLowerCase() ===
          nextSchedule.title.trim().toLowerCase()
      );

      if (nextEvent) {
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
