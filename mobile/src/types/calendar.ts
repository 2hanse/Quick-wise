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
  category: EventCategory;
}

interface EventListItemProps {
  event: CalendarEvent;
}

interface DayEventsSectionProps {
  selectedDate: string;
  events: CalendarEvent[];
}

interface CalendarHeaderProps {
  currentMonth: Date;
  onToday: () => void;
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
};
