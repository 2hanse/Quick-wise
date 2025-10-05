enum EventCategory {
  MEETING = "meeting",
  PRESENTATION = "presentation",
}

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  category?: EventCategory;
  description?: string;
  isAllDay: boolean;
  status: "confirmed" | "tentative" | "cancelled";
}

interface EventListItemProps {
  event: CalendarEvent;
}

interface DayEventsSectionProps {
  selectedDate: string;
  events: CalendarEvent[];
  onAddEvent: () => void;
}

interface CalendarHeaderProps {
  currentMonth: Date;
  onToday: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

interface CalendarScreenProps {
  onNavigateToHome: () => void;
}

interface DateCell {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface MonthCalendarProps {
  currentMonth: Date;
  onDayPress: (dateString: string) => void;
  markedDates?: Record<string, MarkedDate>;
  selectedDate?: string;
}

interface MarkedDate {
  dots: Array<{ color: string }>;
}

interface CalendarEventsResponse {
  message: string;
  events: CalendarEvent[];
  tokenRefreshed: boolean;
}

interface CreateEventRequest {
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  isAllDay: boolean;
}

interface CreateEventResponse {
  message: string;
  event: CalendarEvent;
  tokenRefreshed: boolean;
}

interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: (startDate: string, endDate: string) => Promise<void>;
  createEvent: (eventData: CreateEventRequest) => Promise<void>;
  clearEvents: () => void;
}

export {
  EventCategory,
  CalendarEvent,
  EventListItemProps,
  DayEventsSectionProps,
  CalendarHeaderProps,
  CalendarScreenProps,
  DateCell,
  MonthCalendarProps,
  MarkedDate,
  CalendarEventsResponse,
  CreateEventRequest,
  CreateEventResponse,
  CalendarState,
};
