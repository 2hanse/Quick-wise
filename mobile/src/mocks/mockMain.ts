import type { CalendarData } from "../types/main";

const mockMain: CalendarData = {
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
      id: "comment-content",
      type: "comment",
      commentItems: [
        {
          id: "comment-1",
          highlight: "환경 청찬",
          description: "자연스러운 대화 시작",
        },
        {
          id: "comment-2",
          highlight: "공통 관심사 발견",
          description: "라포 형성",
        },
        {
          id: "comment-3",
          highlight: "상대방 상황 배려",
          description: "호감도 상승",
        },
        {
          id: "comment-4",
          description: "부드러운 본론 진입",
        },
      ],
    },
    {
      id: "scenario-content",
      type: "scenario",
      scenario: {
        id: "scenario-1",
        title: "첫 5분이 승부",
        tags: ["관계 형성", "상대방 상황/감정 고려"],
        dialogue: [
          {
            id: "Conversation-1",
            speaker: "A",
            text: "안녕하세요. 찾아뵙게 되어 반갑습니다.",
          },
          {
            id: "Conversation-2",
            speaker: "B",
            text: "네, 안녕하세요.",
          },
          {
            id: "Conversation-3",
            speaker: "A",
            text: "회의실이 정말 깔끔하네요. 인테리어를 언제 새로 하셨나요?",
            isHighlight: true,
          },
          {
            id: "Conversation-4",
            speaker: "B",
            text: "아, 작년에 리모델링했는데...",
          },
          {
            id: "Conversation-5",
            speaker: "A",
            text: "역시 그렇군요. 저희 사무실도 리모델링 고민 중인데 참고할 게 많을 것 같아요.",
            isHighlight: true,
          },
        ],
      },
    },
    {
      id: "checklist-content",
      type: "checklist",
      checklist: {
        id: "checklist-1",
        title: "체크 리스트",
        items: [
          {
            id: "checklist-item-1",
            text: "명함 2장 준비했나요?",
            completed: true,
          },
          {
            id: "checklist-item-2",
            text: "상대방 회사 최근 뉴스 확인?",
            completed: true,
          },
          {
            id: "checklist-item-3",
            text: "공통점 키워드 3개 정했나요?",
            completed: true,
          },
          {
            id: "checklist-item-4",
            text: "첫 질문 준비했나요?",
            completed: false,
          },
          {
            id: "checklist-item-5",
            text: "심호흡 3번 하고 마음 정리?",
            completed: false,
          },
        ],
        corePoint: "3초 눈맞춤 → 환경 청찬 → 공통점 인급",
      },
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

export default mockMain;
