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

export {
  EventCategory,
  CalendarEvent,
  EventListItemProps,
  DayEventsSectionProps,
  CalendarHeaderProps,
  CalendarScreenProps,
};
