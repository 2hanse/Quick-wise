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

export { GoogleUser, GoogleTokens, GoogleAuthResult };
