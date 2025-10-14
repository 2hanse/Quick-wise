const AI_CONSTANTS = {
  GEMINI: {
    MODEL: "gemini-2.5-flash-lite",
    MAX_TOKENS: 2048,
    TEMPERATURE: 0.7,
  },
  YOUTUBE: {
    API_BASE_URL: "https://www.googleapis.com/youtube/v3",
    CHANNEL_NAME: "세바시",
    CHANNEL_ID: "UCgheNMc3gGHLsT-RISdCzDQ",
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
    TIP_MAX_LENGTH: 30,
    SITUATION_MAX_LENGTH: 50,
    RESPONSE_MAX_LENGTH: 100,
    CHECKLIST_MIN_ITEMS: 3,
    CHECKLIST_MAX_ITEMS: 5,
  },
  SUPPORTED_CATEGORIES: ["meeting", "presentation"] as const,
  ERROR_KEYWORDS: {
    QUOTA: ["quota", "limit"],
    UNSUPPORTED_CATEGORY: ["category", "unsupported"],
  },
  ERROR_TYPES: {
    QUOTA_EXCEEDED: "quota_exceeded",
    TEMPORARY_ERROR: "temporary_error",
    UNSUPPORTED_CATEGORY: "unsupported_category",
  },
} as const;

export default AI_CONSTANTS;
