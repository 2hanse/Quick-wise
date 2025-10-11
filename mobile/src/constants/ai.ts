const AI_CONSTANTS = {
  PROCESSING_STATUS: {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed",
  },
  CARD_TYPES: {
    TIP: "tip",
    SCENARIO: "scenario",
    CHECKLIST: "checklist",
  },
  MESSAGES: {
    LOADING: "AI가 콘텐츠를 생성 중입니다...",
    NO_CONTENT: "아직 AI 콘텐츠가 준비되지 않았습니다",
    FAILED: "AI 콘텐츠 생성에 실패했습니다",
    RETRY: "다시 시도",
    ERROR_FETCH_TODAY: "오늘의 AI 콘텐츠를 불러오는데 실패했습니다",
    ERROR_FETCH_EVENT: "일정의 AI 콘텐츠를 불러오는데 실패했습니다",
  },
  LOG_PREFIXES: {
    FETCH_TODAY_ERROR: "[AI Content] 오늘 AI 콘텐츠 조회 실패:",
    FETCH_EVENT_ERROR: "[AI Content] 일정 AI 콘텐츠 조회 실패:",
  },
} as const;

export default AI_CONSTANTS;
