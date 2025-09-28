const GOOGLE_AUTH_CONFIG = {
  AUTHORIZATION_ENDPOINT: "https://accounts.google.com/o/oauth2/v2/auth",
  TOKEN_ENDPOINT: "https://oauth2.googleapis.com/token",
  USER_INFO_ENDPOINT: "https://www.googleapis.com/oauth2/v2/userinfo",
  REDIRECT_SCHEME: "com.anonymous.quickwise",
  REQUEST_TIMEOUT: 10000,
} as const;

const GOOGLE_AUTH_SCOPES = ["openid", "profile", "email"] as const;

const ENV_KEYS = {
  GOOGLE_CLIENT_ID_ANDROID: "EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID",
  GOOGLE_CLIENT_ID_WEB: "EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB",
} as const;

const STORAGE_KEYS = {
  AUTH_DATA: "@auth/data",
} as const;

export { GOOGLE_AUTH_CONFIG, GOOGLE_AUTH_SCOPES, ENV_KEYS, STORAGE_KEYS };
