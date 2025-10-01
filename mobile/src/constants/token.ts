const TOKEN_MESSAGES = {
  ERROR: {
    SAVE_FAILED: "Failed to save tokens",
    GET_ACCESS_TOKEN_FAILED: "Failed to get access token",
    GET_REFRESH_TOKEN_FAILED: "Failed to get refresh token",
    GET_USER_FAILED: "Failed to get user",
    CLEAR_FAILED: "Failed to clear tokens",
    CHECK_VALIDITY_FAILED: "Failed to check token validity",
  },
} as const;

export { TOKEN_MESSAGES };
