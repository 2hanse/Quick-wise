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
  },
  STORAGE_KEYS: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    USER: "user",
  },
  ERROR_MESSAGES: {
    NO_REFRESH_TOKEN: "No refresh token available",
    TOKEN_REFRESH_FAILED: "Token refresh failed",
  },
} as const;

export default API_CONSTANTS;
