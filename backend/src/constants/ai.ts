const AI_CONSTANTS = {
  GEMINI: {
    MODEL: "gemini-2.0-flash-exp",
    MAX_TOKENS: 2048,
    TEMPERATURE: 0.7,
  },
  YOUTUBE: {
    API_BASE_URL: "https://www.googleapis.com/youtube/v3",
    CHANNEL_NAME: "세바시",
    MAX_RESULTS: 10,
    MIN_DURATION_SECONDS: 300,
    RELEVANCE_ORDER: "relevance",
    VIDEO_TYPE: "video",
    TOP_VIDEOS_COUNT: 1,
  },
  PROCESSING: {
    TRANSCRIPT_MAX_LENGTH: 10000,
    SUMMARY_MIN_LENGTH: 500,
    SUMMARY_MAX_LENGTH: 800,
  },
  CARD_LIMITS: {
    TIP_MAX_LENGTH: 20,
    SITUATION_MAX_LENGTH: 50,
    RESPONSE_MAX_LENGTH: 100,
    CHECKLIST_MIN_ITEMS: 3,
    CHECKLIST_MAX_ITEMS: 5,
  },
} as const;

export default AI_CONSTANTS;
