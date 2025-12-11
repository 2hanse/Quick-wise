import { AICard } from "./ai";

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
  aiContent?: {
    status: "pending" | "processing" | "completed" | "failed";
    cards: AICard[];
    keywords: string[];
    usedVideoIds: string[];
    processedAt?: Date;
    error?: string;
  };
}

interface EventListItemProps {
  event: CalendarEvent;
  onPress: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

interface DayEventsSectionProps {
  selectedDate: string;
  events: CalendarEvent[];
  onAddEvent: () => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
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

interface UpdateEventRequest {
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

interface UpdateEventResponse {
  message: string;
  event: CalendarEvent;
  tokenRefreshed: boolean;
}

interface DeleteEventResponse {
  message: string;
  tokenRefreshed: boolean;
}

interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: (
    startDate: string,
    endDate: string,
    forceRefresh?: boolean
  ) => Promise<void>;
  createEvent: (eventData: CreateEventRequest) => Promise<void>;
  updateEvent: (
    eventId: string,
    eventData: UpdateEventRequest
  ) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  clearEvents: () => void;
}

interface CacheEntry {
  events: CalendarEvent[];
  timestamp: number;
}

interface CalendarStateWithCache extends CalendarState {
  cache: Record<string, CacheEntry>;
  getCachedEvents: (
    startDate: string,
    endDate: string
  ) => CalendarEvent[] | null;
  setCachedEvents: (
    startDate: string,
    endDate: string,
    events: CalendarEvent[]
  ) => void;
  clearCache: () => void;
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
  UpdateEventRequest,
  CreateEventResponse,
  UpdateEventResponse,
  DeleteEventResponse,
  CalendarState,
  CacheEntry,
  CalendarStateWithCache,
};
