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

interface AuthTokenResponse {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
}

interface GoogleUserInfoResponse {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: GoogleUser | null;
  tokens: GoogleTokens | null;
}

interface AuthActions {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loadAuthState: () => Promise<void>;
}

interface AuthStore extends AuthState, AuthActions {}

export {
  GoogleUser,
  GoogleTokens,
  GoogleAuthResult,
  AuthTokenResponse,
  GoogleUserInfoResponse,
  AuthState,
  AuthActions,
  AuthStore,
};
