import type { CalendarData } from "../types/main";

const mockCalendar: CalendarData = {
  dateInfo: {
    date: "9월 18일",
    dayOfWeek: "목요일",
    totalSchedules: 3,
    studySchedules: 2,
  },
  nextSchedule: {
    startTime: "오후 2:00",
    title: "클라이언트 미팅",
    location: "강남역 스타벅스",
    lecture: {
      title: "[TES] 첫 5분이 모든걸 결정한다...",
    },
  },
  swipeContents: [
    {
      id: "content-1",
      type: "comment",
      effects: [
        {
          id: "effect-1",
          highlight: "환경 청찬",
          description: "자연스러운 대화 시작",
        },
        {
          id: "effect-2",
          highlight: "공통 관심사 발견",
          description: "라포 형성",
        },
        {
          id: "effect-3",
          highlight: "상대방 상황 배려",
          description: "호감도 상승",
        },
        {
          id: "effect-4",
          description: "부드러운 본론 진입",
        },
      ],
    },
    {
      id: "content-2",
      type: "scenario",
      effects: [],
    },
    {
      id: "content-3",
      type: "checklist",
      effects: [],
    },
  ],
  todaySchedules: [
    {
      id: "schedule-today-1",
      time: "9:00 AM",
      title: "팀 미팅",
      status: "completed",
      badge: "완료",
    },
    {
      id: "schedule-today-2",
      time: "2:00 PM",
      title: "클라이언트 미팅",
      status: "progress",
      badge: "진행중",
    },
    {
      id: "schedule-today-3",
      time: "4:00 PM",
      title: "프로젝트 회의",
      status: "upcoming",
      badge: "예정",
    },
  ],
};

export default mockCalendar;
