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
  },
  STATUS_ICONS: {
    COMPLETED: "✓",
    PROGRESS: "●",
    UPCOMING: "○",
  },
  STORAGE_KEYS: {
    CHECKLIST_STATE: "@checklist_state",
  },
} as const;

export default mainPageConstants;
