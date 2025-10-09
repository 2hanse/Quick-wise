import constants from "../../../constants/messages";
import {
  GoogleCalendarEvent,
  CalendarEvent,
  EventStatus,
} from "../../../types/calendar";

const convertToCalendarEvent = (
  googleEvent: GoogleCalendarEvent
): CalendarEvent => {
  const startTime = googleEvent.start.dateTime || googleEvent.start.date;
  const endTime = googleEvent.end.dateTime || googleEvent.end.date;

  if (!startTime || !endTime) {
    throw new Error(constants.ERROR_MESSAGES.CALENDAR.INVALID_EVENT_DATA);
  }

  const isAllDay = !googleEvent.start.dateTime;

  const status = (googleEvent.status ||
    constants.GOOGLE_CALENDAR.EVENT_STATUS.CONFIRMED) as EventStatus;

  return {
    id: googleEvent.id,
    title: googleEvent.summary || constants.GOOGLE_CALENDAR.DEFAULT_TITLE,
    startTime,
    endTime,
    location: googleEvent.location,
    description: googleEvent.description,
    isAllDay,
    status,
  };
};

const convertToGoogleTimeFormat = (
  time: string,
  isAllDay: boolean
): { dateTime?: string; date?: string; timeZone: string } => {
  const timeZone = constants.GOOGLE_CALENDAR.DEFAULT_TIME_ZONE;

  if (isAllDay) {
    const dateOnly = time.includes("T") ? time.split("T")[0] : time;
    return {
      date: dateOnly,
      timeZone,
    };
  }

  return {
    dateTime: time,
    timeZone,
  };
};

export { convertToCalendarEvent, convertToGoogleTimeFormat };
