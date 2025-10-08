import constants from "../../../constants/messages";
import {
  GoogleCalendarEvent,
  CalendarEvent,
  EventStatus,
} from "../../../types/calendar";

const convertToCalendarEvent = (
  googleEvent: GoogleCalendarEvent
): CalendarEvent => {
  const isAllDay = !googleEvent.start.dateTime;
  const startTime = googleEvent.start.dateTime || googleEvent.start.date || "";
  const endTime = googleEvent.end.dateTime || googleEvent.end.date || "";
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
  if (isAllDay) {
    return {
      date: time.split("T")[0],
      timeZone: constants.GOOGLE_CALENDAR.DEFAULT_TIME_ZONE,
    };
  }

  return {
    dateTime: time,
    timeZone: constants.GOOGLE_CALENDAR.DEFAULT_TIME_ZONE,
  };
};

export { convertToCalendarEvent, convertToGoogleTimeFormat };
