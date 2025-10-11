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
    TOP_VIDEOS_COUNT: 3,
  },
} as const;

export default AI_CONSTANTS;
