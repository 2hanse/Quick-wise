import { CalendarEvent, EventCategory } from "../types/calendar";

const mockCalendar: CalendarEvent[] = [
  {
    id: "1",
    title: "팀 미팅",
    startTime: "2025-10-02T14:00:00",
    endTime: "2025-10-02T15:00:00",
    location: "회의실 A",
    category: EventCategory.MEETING,
  },
  {
    id: "2",
    title: "프로젝트 발표",
    startTime: "2025-10-02T16:00:00",
    endTime: "2025-10-02T17:00:00",
    location: "대회의실",
    category: EventCategory.PRESENTATION,
  },
  {
    id: "3",
    title: "주간 회의",
    startTime: "2025-10-05T10:00:00",
    endTime: "2025-10-05T11:00:00",
    location: "회의실 B",
    category: EventCategory.MEETING,
  },
  {
    id: "4",
    title: "신규 서비스 발표",
    startTime: "2025-10-07T15:00:00",
    endTime: "2025-10-07T16:30:00",
    location: "대강당",
    category: EventCategory.PRESENTATION,
  },
  {
    id: "5",
    title: "분기 전략 회의",
    startTime: "2025-10-09T09:00:00",
    endTime: "2025-10-09T12:00:00",
    location: "임원 회의실",
    category: EventCategory.MEETING,
  },
  {
    id: "6",
    title: "기술 세미나 발표",
    startTime: "2025-10-10T14:00:00",
    endTime: "2025-10-10T15:30:00",
    location: "세미나실 C",
    category: EventCategory.PRESENTATION,
  },
];

export default mockCalendar;
