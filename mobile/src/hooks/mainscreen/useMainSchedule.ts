import { useState, useEffect } from "react";
import { fetchTodayEvents } from "../../services/calendarService";
import {
  convertToTodaySchedules,
  createDateInfo,
  getNextSchedule,
} from "../../utils/mainscreen/calendarEventConverter";
import { TodaySchedule, DateInfo, NextSchedule } from "../../types/main";
import mainPageConstants from "../../constants/main";

const useMainSchedule = () => {
  const [todaySchedules, setTodaySchedules] = useState<TodaySchedule[]>([]);
  const [nextSchedule, setNextSchedule] = useState<NextSchedule | null>(null);
  const [dateInfo, setDateInfo] = useState<DateInfo>(createDateInfo(0));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return {
    todaySchedules,
    nextSchedule,
    dateInfo,
    isLoading,
    error,
  };
};

export default useMainSchedule;
