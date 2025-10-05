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
    },
  },
  SUCCESS: {
    DATABASE: {
      CONNECTION_SUCCESS: "MongoDB connected successfully",
    },
    CALENDAR: {
      EVENTS_FETCHED: "Calendar events fetched successfully",
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
} as const;

export default constants;
