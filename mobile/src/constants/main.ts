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
      EFFECTS_TITLE: "💡 효과",
    },
    TODAY_SCHEDULE: {
      TITLE: "오늘의 일정",
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
  },
  STATUS_ICONS: {
    COMPLETED: "✓",
    PROGRESS: "●",
    UPCOMING: "○",
  },
} as const;

export default mainPageConstants;
