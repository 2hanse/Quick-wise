const mainPageConstants = {
  TEXT: {
    DATE_HEADER: {
      SCHEDULE_COUNT: (total: number) => `일정 ${total}개`,
      REFRESH_BUTTON: "새로고침",
    },
    NEXT_SCHEDULE: {
      TITLE: "다음 일정",
      PLAY_BUTTON: "Play",
      AI_PROCESSING: "AI 분석 중...",
      AI_FAILED: "AI 분석 실패",
      AI_UNSUPPORTED: "이 일정은 AI 분석을 지원하지 않습니다",
    },
    SWIPE_CONTENT: {
      COMMENTITEM_TITLE: "💡 효과",
      CARD_PADDING: 24,
      SCROLL_THROTTLE: 16,
      SOURCE: {
        TITLE: "출처:",
        SPEAKER: "연사:",
      },
      SCENARIO: {
        SITUATION_LABEL: "상황:",
        RESPONSE_LABEL: "대응:",
      },
    },
    TODAY_SCHEDULE: {
      TITLE: "오늘의 일정",
    },
    CHECKLIST_KEYPOINT: {
      TITLE: "오늘의 핵심 포인트",
    },
    EMPTY_SCHEDULE: {
      TITLE: "계획된 일정이 없습니다",
      SUBTITLE: "오늘은 자유로운 하루입니다\n여유롭게 시간을 보내세요",
      SUGGESTION_TITLE: "이런 활동은 어떠세요?",
      ACTIVITIES: {
        READING: "독서",
        MUSIC: "음악감상",
        WALKING: "산책",
        REST: "휴식",
      },
    },
    LOADING: "일정을 불러오는 중...",
    ERROR_LOAD_FAILED: "일정을 불러오는데 실패했습니다",
  },
  ICONS: {
    DATE_HEADER: "📅",
    WEATHER: "☀️",
    TARGET: "🎯",
    LOCATION: "📍",
    PLAY: "▶",
    BULLET: "•",
    EFFECTS: "💡",
    SCHEDULE_LIST: "📋",
    REFRESH: "🔄",
    EMPTY_SCHEDULE: {
      READING: "📖",
      MUSIC: "🎵",
      WALKING: "🚶",
      REST: "☕️",
    },
    ERROR: "⚠️",
  },
  STATUS_ICONS: {
    COMPLETED: "✓",
    PROGRESS: "●",
    UPCOMING: "○",
  },
  STATUS_BADGES: {
    COMPLETED: "완료",
    PROGRESS: "진행중",
    UPCOMING: "예정",
  },
  STATUS_VALUES: {
    COMPLETED: "completed" as const,
    PROGRESS: "progress" as const,
    UPCOMING: "upcoming" as const,
  },
  AI_STATUS: {
    PROCESSING: "processing" as const,
    COMPLETED: "completed" as const,
    FAILED: "failed" as const,
    PENDING: "pending" as const,
  },
  TIME_FORMAT: {
    ALL_DAY: "종일",
    AM: "오전",
    PM: "오후",
    MIDNIGHT_HOUR: 0,
    NOON_HOUR: 12,
    MINUTE_PAD_LENGTH: 2,
    MINUTE_PAD_CHAR: "0",
  },
  TIME_CONVERSION: {
    MILLISECONDS_TO_MINUTES: 1000 * 60,
  },
  DATE_FORMAT: {
    MONTH_SUFFIX: "월",
    DAY_SUFFIX: "일",
    DAY_OF_WEEK_SUFFIX: "요일",
  },
  DAY_OF_WEEK: ["일", "월", "화", "수", "목", "금", "토"],
  SCHEDULE_STATUS: {
    PROGRESS_THRESHOLD_MINUTES: 60,
  },
  STORAGE_KEYS: {
    CHECKLIST_STATE: "@checklist_state",
  },
  LOG_PREFIXES: {
    MAIN_SCREEN: "[MainScreen]",
  },
  LOG_MESSAGES: {
    FAILED_TO_LOAD: "Failed to load today schedules",
    CHECKLIST_LOAD_FAILED: "Failed to load checklist state:",
    CHECKLIST_SAVE_FAILED: "Failed to save checklist state:",
  },
  AI_CONTENT: {
    FIXED_HEIGHT: 180,
  },
  SKELETON: {
    ANIMATION_DURATION: 1200,
    OPACITY_MIN: 0.3,
    OPACITY_MAX: 0.6,
    ANIMATION_START: 0,
    ANIMATION_END: 1,
  },
  POLLING: {
    INTERVAL_MS: 5000,
    MAX_ATTEMPTS: 6,
    TIMEOUT_MS: 30000,
  },
} as const;

export default mainPageConstants;
