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

export { EventCategory, CalendarEvent, EventListItemProps };
