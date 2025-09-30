const constants = {
  ERROR_MESSAGES: {
    DATABASE: {
      MONGODB_URI_NOT_DEFINED: "MONGODB_URI 환경 변수에 정의되지 않았습니다.",
      CONNECTION_ERROR: "MongoDB 연결에 실패했습니다.",
    },
    GOOGLE_AUTH: {
      CLIENT_ID_NOT_DEFINED:
        "GOOGLE_CLIENT_ID가 환경 변수에 정의되지 않았습니다.",
      INVALID_TOKEN: "유효하지 않은 Google 토큰입니다.",
      VERIFICATION_FAILED: "Google 토큰 검증에 실패했습니다.",
      INVALID_PAYLOAD: "유효하지 않은 토큰 페이로드입니다",
    },
    JWT: {
      SECRET_NOT_DEFINED: "JWT_SECRET이 환경 변수에 정의되지 않았습니다.",
      INVALID_OR_EXPIRED_TOKEN: "유효하지 않거나 만료된 토큰입니다",
      JWT_VERIFICATION_FAILED: "JWT 토큰 검증에 실패했습니다.",
    },
  },
  SUCCESS: {
    DATABASE: {
      CONNECTION_SUCCESS: "MongoDB 연결 성공",
    },
  },
  TOKEN: {
    ACCESS_TOKEN_EXPIRATION: "15m",
    REFRESH_TOKEN_EXPIRATION: "7d",
  },
} as const;

export default constants;
