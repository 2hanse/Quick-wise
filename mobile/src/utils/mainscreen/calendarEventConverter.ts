import { CalendarEvent } from "../../types/calendar";
import {
  TodaySchedule,
  ScheduleStatus,
  DateInfo,
  NextSchedule,
} from "../../types/main";
import mainPageConstants from "../../constants/main";

const getScheduleStatus = (startTime: string): ScheduleStatus => {
  const now = new Date();
  const eventStart = new Date(startTime);

  if (eventStart < now) {
    return mainPageConstants.STATUS_VALUES.COMPLETED;
  }

  const diffMinutes =
    (eventStart.getTime() - now.getTime()) /
    mainPageConstants.TIME_CONVERSION.MILLISECONDS_TO_MINUTES;

  if (
    diffMinutes <= mainPageConstants.SCHEDULE_STATUS.PROGRESS_THRESHOLD_MINUTES
  ) {
    return mainPageConstants.STATUS_VALUES.PROGRESS;
  }

  return mainPageConstants.STATUS_VALUES.UPCOMING;
};

const getStatusBadge = (status: ScheduleStatus): string => {
  const badgeMap = {
    [mainPageConstants.STATUS_VALUES.COMPLETED]:
      mainPageConstants.STATUS_BADGES.COMPLETED,
    [mainPageConstants.STATUS_VALUES.PROGRESS]:
      mainPageConstants.STATUS_BADGES.PROGRESS,
    [mainPageConstants.STATUS_VALUES.UPCOMING]:
      mainPageConstants.STATUS_BADGES.UPCOMING,
  };
  return badgeMap[status];
};

const formatTime = (dateTimeString: string, isAllDay: boolean): string => {
  if (isAllDay) {
    return mainPageConstants.TIME_FORMAT.ALL_DAY;
  }

  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period =
    hours >= mainPageConstants.TIME_FORMAT.NOON_HOUR
      ? mainPageConstants.TIME_FORMAT.PM
      : mainPageConstants.TIME_FORMAT.AM;
  const displayHours =
    hours > mainPageConstants.TIME_FORMAT.NOON_HOUR
      ? hours - mainPageConstants.TIME_FORMAT.NOON_HOUR
      : hours === mainPageConstants.TIME_FORMAT.MIDNIGHT_HOUR
        ? mainPageConstants.TIME_FORMAT.NOON_HOUR
        : hours;
  const displayMinutes = minutes
    .toString()
    .padStart(
      mainPageConstants.TIME_FORMAT.MINUTE_PAD_LENGTH,
      mainPageConstants.TIME_FORMAT.MINUTE_PAD_CHAR
    );

  return `${period} ${displayHours}:${displayMinutes}`;
};

const convertToTodaySchedule = (event: CalendarEvent): TodaySchedule => {
  const status = getScheduleStatus(event.startTime);

  return {
    id: event.id,
    time: formatTime(event.startTime, event.isAllDay),
    title: event.title,
    status,
    badge: getStatusBadge(status),
  };
};

const convertToTodaySchedules = (events: CalendarEvent[]): TodaySchedule[] => {
  return events
    .sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    })
    .map(convertToTodaySchedule);
};

const createDateInfo = (scheduleCount: number): DateInfo => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayOfWeek = mainPageConstants.DAY_OF_WEEK[today.getDay()];

  return {
    date: `${month}${mainPageConstants.DATE_FORMAT.MONTH_SUFFIX} ${date}${mainPageConstants.DATE_FORMAT.DAY_SUFFIX}`,
    dayOfWeek: `${dayOfWeek}${mainPageConstants.DATE_FORMAT.DAY_OF_WEEK_SUFFIX}`,
    totalSchedules: scheduleCount,
    studySchedules: 0,
  };
};

const getNextSchedule = (events: CalendarEvent[]): NextSchedule | null => {
  const now = new Date();

  const upcomingEvents = events
    .filter((event) => new Date(event.startTime) > now)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  if (upcomingEvents.length === 0) {
    return null;
  }

  const nextEvent = upcomingEvents[0];

  return {
    startTime: formatTime(nextEvent.startTime, nextEvent.isAllDay),
    title: nextEvent.title,
    location: nextEvent.location || "위치 정보 없음",
    lecture: {
      title: "일정 관련 강의 준비 중",
    },
  };
};

export {
  convertToTodaySchedule,
  convertToTodaySchedules,
  createDateInfo,
  formatTime,
  getScheduleStatus,
  getStatusBadge,
  getNextSchedule,
};
