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

interface CalendarScreenProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export { EventCategory, CalendarEvent, CalendarScreenProps };
