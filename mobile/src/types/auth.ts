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

interface AuthState {
  user: BackendUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: BackendUser | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  login: (
    accessToken: string,
    refreshToken: string,
    user: BackendUser
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

interface RefreshTokenError {
  code: "REFRESH_FAILED" | "NO_REFRESH_TOKEN" | "NETWORK_ERROR";
  message: string;
  originalError?: unknown;
}

export {
  GoogleUser,
  GoogleTokens,
  GoogleAuthResult,
  BackendUser,
  BackendLoginResponse,
  BackendRefreshResponse,
  BackendMeResponse,
  AuthState,
  RefreshTokenError,
};
