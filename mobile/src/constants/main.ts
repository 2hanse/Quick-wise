const mainPageConstants = {
  TEXT: {
    DATE_HEADER: {
      SCHEDULE_COUNT: (total: number, study: number) =>
        `일정 ${total}개, 학습 준비 ${study}개`,
    },
    NEXT_SCHEDULE: {
      TITLE: "다음 일정",
      PLAY_BUTTON: "Play",
    },
    SWIPE_CONTENT: {
      COMMENTITEM_TITLE: "💡 효과",
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
    EFFECTS: "💡",
    SCHEDULE_LIST: "📋",
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
  },
} as const;

export default mainPageConstants;
