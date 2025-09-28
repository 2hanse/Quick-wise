import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  GOOGLE_AUTH_CONFIG,
  GOOGLE_AUTH_SCOPES,
  ENV_KEYS,
} from "../constants/auth";
import { ERR_MESSAGE_CLIENT_ID_NOT_SET } from "../constants/errors";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

const getClientId = (): string => {
  if (Constants.platform?.android) {
    const clientId = process.env[ENV_KEYS.GOOGLE_CLIENT_ID_ANDROID];
    if (!clientId) throw new Error(ERR_MESSAGE_CLIENT_ID_NOT_SET);
    return clientId;
  } else {
    const clientId = process.env[ENV_KEYS.GOOGLE_CLIENT_ID_WEB];
    if (!clientId) throw new Error(ERR_MESSAGE_CLIENT_ID_NOT_SET);
    return clientId;
  }
};

const getRedirectUri = (): string => {
  return AuthSession.makeRedirectUri({
    scheme: GOOGLE_AUTH_CONFIG.REDIRECT_SCHEME,
    path: "oauthredirect",
  });
};

const signInWithGoogle = async () => {
  const clientId = getClientId();
  const redirectUri = getRedirectUri();

  const request = new AuthSession.AuthRequest({
    clientId,
    scopes: [...GOOGLE_AUTH_SCOPES],
    redirectUri,
    responseType: AuthSession.ResponseType.Code,
    extraParams: {
      access_type: "offline",
      prompt: "consent",
    },
  });

  const result = await request.promptAsync({
    authorizationEndpoint: GOOGLE_AUTH_CONFIG.AUTHORIZATION_ENDPOINT,
  });

  return result;
};

export { signInWithGoogle };
