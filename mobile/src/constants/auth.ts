const AUTH_MESSAGES = {
  ERROR: {
    PLAY_SERVICES_NOT_AVAILABLE: "Play Services not available",
    GOOGLE_SIGN_IN: "Google Sign-In error",
    SIGN_OUT: "Sign-out error",
    CHECK_STATUS: "Check sign-in status error",
    GET_CURRENT_USER: "Get current user error",
    SILENT_SIGN_IN: "Silent sign-in error",
    BACKEND_LOGIN_FAILED: "Backend login failed",
    TOKEN_REFRESH_FAILED: "Token refresh failed",
    GET_USER_INFO_FAILED: "Failed to get user info",
    CHECK_AUTH_STATUS_FAILED: "Failed to check auth status",
  },
  UI: {
    LOGIN_ERROR_DEFAULT: "로그인에 실패했습니다. 다시 시도해주세요.",
    TOKEN_REFRESH_ERROR_DEFAULT: "토큰 갱신에 실패했습니다.",
    GET_USER_INFO_ERROR_DEFAULT: "사용자 정보를 가져올 수 없습니다.",
  },
};

export default AUTH_MESSAGES;
