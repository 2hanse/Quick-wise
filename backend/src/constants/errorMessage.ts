const constants = {
  ERROR_MESSAGES: {
    AUTH: {
      JWT_SECRET_NOT_DEFINED: "JWT_SECRET이 환경 변수에 정의되지 않았습니다.",
      INVALID_OR_EXPIRED_TOKEN: "유효하지 않거나 만료된 토큰입니다",
      JWT_VERIFICATION_FAILED: "JWT 토큰 검증에 실패했습니다.",
    },
  },
  JWT: {
    ACCESS_TOKEN_EXPIRATION: "15m",
    REFRESH_TOKEN_EXPIRATION: "7d",
  },
} as const;

export default constants;
