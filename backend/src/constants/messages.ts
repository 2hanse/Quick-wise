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
  },
  SUCCESS: {
    DATABASE: {
      CONNECTION_SUCCESS: "MongoDB connected successfully",
    },
  },
  TOKEN: {
    ACCESS_TOKEN_EXPIRATION: "15m",
    REFRESH_TOKEN_EXPIRATION: "7d",
    GOOGLE_TOKEN_DEFAULT_EXPIRATION: 3600,
  },
} as const;

export default constants;
