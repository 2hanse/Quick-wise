interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface GoogleTokens {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

interface GoogleAuthResult {
  type: "success" | "cancel";
  tokens?: GoogleTokens;
  user?: GoogleUser;
}

interface BackendUser {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

interface BackendLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: BackendUser;
}

interface BackendRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface BackendMeResponse {
  user: BackendUser;
}

export {
  GoogleUser,
  GoogleTokens,
  GoogleAuthResult,
  BackendUser,
  BackendLoginResponse,
  BackendRefreshResponse,
  BackendMeResponse,
};
