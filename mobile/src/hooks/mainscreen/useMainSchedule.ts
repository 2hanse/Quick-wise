import { useState, useEffect } from "react";
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

  const {
    todayEvents,
    fetchTodayAIContent,
    isLoading: aiLoading,
  } = useAIStore();

  useEffect(() => {
    const loadTodaySchedules = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchTodayEvents();
        const schedules = convertToTodaySchedules(response.events);
        const next = getNextSchedule(response.events);

        setTodaySchedules(schedules);
        setNextSchedule(next);
        setDateInfo(createDateInfo(schedules.length));

        await fetchTodayAIContent();
      } catch (err) {
        console.error(
          `${mainPageConstants.LOG_PREFIXES.MAIN_SCREEN} ${mainPageConstants.LOG_MESSAGES.FAILED_TO_LOAD}:`,
          err
        );
        setError(mainPageConstants.TEXT.ERROR_LOAD_FAILED);
        setTodaySchedules([]);
        setNextSchedule(null);
        setDateInfo(createDateInfo(0));
      } finally {
        setIsLoading(false);
      }
    };

    loadTodaySchedules();
  }, []);

  useEffect(() => {
    if (swipeContents.length === 0 && nextSchedule) {
      const timer = setTimeout(async () => {
        await fetchTodayAIContent();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [swipeContents, nextSchedule]);

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
  }, [todayEvents, nextSchedule?.title]);

  return {
    todaySchedules,
    nextSchedule,
    dateInfo,
    swipeContents,
    isLoading: isLoading || aiLoading,
    error,
  };
};

export default useMainSchedule;
