const constants = {
  ERROR_MESSAGES: {
    DATABASE: {
      MONGODB_URI_NOT_DEFINED:
        "MONGODB_URI is not defined in environment variables",
      CONNECTION_ERROR: "Failed to connect to MongoDB",
    },
    GOOGLE_AUTH: {
      CLIENT_ID_NOT_DEFINED:
        "GOOGLE_CLIENT_ID is not defined in environment variables",
      INVALID_TOKEN: "Invalid Google token",
      VERIFICATION_FAILED: "Google token verification failed",
      INVALID_PAYLOAD: "Invalid token payload",
      ACCESS_TOKEN_REQUIRED: "Google access token is required",
      REFRESH_TOKEN_NOT_FOUND: "Google refresh token not found for user",
      TOKEN_REFRESH_FAILED: "Failed to refresh Google access token",
    },
    JWT: {
      SECRET_NOT_DEFINED: "JWT_SECRET is not defined in environment variables",
      INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
      JWT_VERIFICATION_FAILED: "JWT token verification failed",
    },
    AUTH: {
      ID_TOKEN_REQUIRED: "ID token is required",
      AUTHENTICATION_FAILED: "Authentication failed",
      REFRESH_TOKEN_REQUIRED: "Refresh token is required",
      INVALID_REFRESH_TOKEN: "Invalid refresh token",
      TOKEN_REQUIRED: "Access token is required",
      UNAUTHORIZED: "Unauthorized access",
    },
    USER: {
      NOT_FOUND: "User not found",
      FAILED_TO_GET_INFO: "Failed to get user information",
    },
    CALENDAR: {
      GOOGLE_ACCESS_TOKEN_NOT_FOUND: "Google access token not found for user",
      FAILED_TO_FETCH_EVENTS: "Failed to fetch calendar events",
      INVALID_DATE_RANGE: "Invalid date range provided",
      GOOGLE_API_ERROR: "Google Calendar API error",
      TOKEN_EXPIRED: "Google access token has expired",
      PERMISSION_DENIED: "Calendar access permission denied",
      SERVER_ERROR: "Google Calendar server error",
      INVALID_EVENT_DATA: "Invalid event data provided",
      REQUIRED_FIELD_MISSING: "Required field is missing",
      INVALID_TIME_FORMAT: "Invalid time format",
      END_TIME_BEFORE_START: "End time must be after start time",
      FAILED_TO_CREATE_EVENT: "Failed to create calendar event",
      EVENT_NOT_FOUND: "Calendar event not found",
      FAILED_TO_UPDATE_EVENT: "Failed to update calendar event",
      FAILED_TO_DELETE_EVENT: "Failed to delete calendar event",
      SYNC_FAILED: "Failed to sync calendar events",
    },
    GEMINI: {
      API_KEY_NOT_DEFINED:
        "GEMINI_API_KEY is not defined in environment variables",
      API_ERROR: "Gemini API error",
      RATE_LIMIT_EXCEEDED: "Gemini API rate limit exceeded",
      INVALID_RESPONSE: "Invalid response from Gemini API",
      GENERATION_FAILED: "Content generation failed",
    },
    YOUTUBE: {
      API_KEY_NOT_DEFINED:
        "YOUTUBE_API_KEY is not defined in environment variables",
      SEARCH_FAILED: "YouTube video search failed",
      NO_RESULTS: "No suitable videos found",
      INVALID_VIDEO_ID: "Invalid YouTube video ID",
      API_ERROR: "YouTube API error",
    },
  },
  SUCCESS: {
    DATABASE: {
      CONNECTION_SUCCESS: "MongoDB connected successfully",
    },
    CALENDAR: {
      EVENTS_FETCHED: "Calendar events fetched successfully",
      EVENT_CREATED: "Calendar event created successfully",
      EVENT_UPDATED: "Calendar event updated successfully",
      EVENT_DELETED: "Calendar event deleted successfully",
      SYNC_COMPLETED: "Calendar sync completed successfully",
    },
    GOOGLE_AUTH: {
      TOKEN_REFRESHED: "Google access token refreshed successfully",
    },
  },
  TOKEN: {
    ACCESS_TOKEN_EXPIRATION: "15m",
    REFRESH_TOKEN_EXPIRATION: "7d",
    GOOGLE_TOKEN_DEFAULT_EXPIRATION: 3600,
  },
  GOOGLE_CALENDAR: {
    API_BASE_URL: "https://www.googleapis.com/calendar/v3",
    DEFAULT_CALENDAR_ID: "primary",
    DEFAULT_MAX_RESULTS: 100,
    DEFAULT_TIME_ZONE: "Asia/Seoul",
    ORDER_BY: "startTime",
    SINGLE_EVENTS: true,
    EVENT_STATUS: {
      CONFIRMED: "confirmed",
      TENTATIVE: "tentative",
      CANCELLED: "cancelled",
    },
    DEFAULT_TITLE: "제목 없음",
  },
  EVENT_CATEGORY: {
    MEETING: {
      VALUE: "meeting",
      KEYWORDS: ["미팅", "회의", "meeting", "conference", "mtg"],
    },
    PRESENTATION: {
      VALUE: "presentation",
      KEYWORDS: ["프레젠테이션", "발표", "presentation", "present"],
    },
  },
  GOOGLE_OAUTH: {
    TOKEN_URL: "https://oauth2.googleapis.com/token",
    GRANT_TYPE_REFRESH: "refresh_token",
    CONTENT_TYPE_FORM: "application/x-www-form-urlencoded",
  },
  HTTP: {
    CONTENT_TYPE_JSON: "application/json",
  },
  LOG_PREFIXES: {
    CALENDAR_ERROR: "[Calendar API Error]",
    GENERAL_ERROR: "[Error]",
    TOKEN_REFRESH: "[Token Refresh]",
    EVENT_CREATE: "[Event Create]",
    EVENT_UPDATE: "[Event Update]",
    EVENT_DELETE: "[Event Delete]",
    CALENDAR_SYNC: "[Calendar Sync]",
    GEMINI_API: "[Gemini API]",
    YOUTUBE_SEARCH: "[YouTube Search]",
  },
} as const;

export default constants;
