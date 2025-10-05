type EventStatus = "confirmed" | "tentative" | "cancelled";

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  status?: string;
}

interface GoogleCalendarListResponse {
  items: GoogleCalendarEvent[];
  nextPageToken?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  isAllDay: boolean;
  status?: EventStatus;
}

interface CalendarEventQuery {
  startDate: string;
  endDate: string;
  maxResults?: number;
}

export type { EventStatus };
export {
  GoogleCalendarEvent,
  GoogleCalendarListResponse,
  CalendarEvent,
  CalendarEventQuery,
};
