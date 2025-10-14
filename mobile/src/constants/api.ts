const API_CONSTANTS = {
  BASE_URL: "http://10.0.2.2:3000/api",
  TIMEOUT: 10000,
  HEADERS: {
    CONTENT_TYPE: "application/json",
  },
  ENDPOINTS: {
    AUTH: {
      GOOGLE: "/auth/google",
      REFRESH: "/auth/refresh",
      ME: "/auth/me",
    },
    CALENDAR: {
      EVENTS: "/calendar/events",
      TODAY: "/calendar/today",
    },
    AI: {
      TODAY: "/ai/today",
      EVENT: "/ai/event",
      RETRY: "/ai/event",
    },
  } as const,
  STORAGE_KEYS: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    USER: "user",
  },
  ERROR_MESSAGES: {
    NO_REFRESH_TOKEN: "No refresh token available",
    TOKEN_REFRESH_FAILED: "Token refresh failed",
    UNKNOWN: "알 수 없는 오류가 발생했습니다",
    UNAUTHORIZED: "인증이 필요합니다",
  },
  TOKEN_REFRESH: {
    FAILED_TITLE: "세션 만료",
    FAILED_MESSAGE: "로그인이 만료되었습니다. 다시 로그인해주세요.",
    NO_REFRESH_TOKEN: "갱신 토큰이 없습니다",
    NETWORK_ERROR: "네트워크 오류가 발생했습니다",
  },
  TOAST: {
    DURATION: 3000,
    TOP_OFFSET: 60,
    POSITION: "top",
    ERROR_TYPE: "error",
  },
} as const;

export default API_CONSTANTS;
