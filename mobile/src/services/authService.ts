import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthResult, GoogleUser, GoogleTokens } from "../types/auth";
import AUTH_MESSAGES from "../constants/auth";

const configureGoogleSignIn = (): void => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    scopes: ["profile", "email"],
  });
};

const signInWithGoogle = async (): Promise<GoogleAuthResult> => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const response = await GoogleSignin.signIn();

    if (response.type !== "success") {
      return { type: "cancel" };
    }

    const tokens = await GoogleSignin.getTokens();
    const userData = response.data;

    const user: GoogleUser = {
      id: userData.user.id,
      email: userData.user.email,
      name: userData.user.name || "",
    };

    const googleTokens: GoogleTokens = {
      accessToken: tokens.accessToken,
      idToken: tokens.idToken || "",
      refreshToken: userData.serverAuthCode || undefined,
      expiresIn: undefined,
    };

    return {
      type: "success",
      tokens: googleTokens,
      user,
    };
  } catch (error) {
    const typedError = error as { code?: string };

    if (typedError.code === statusCodes.SIGN_IN_CANCELLED) {
      return { type: "cancel" };
    }

    if (typedError.code === statusCodes.IN_PROGRESS) {
      return { type: "cancel" };
    }

    if (typedError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.error(AUTH_MESSAGES.ERROR.PLAY_SERVICES_NOT_AVAILABLE);
      return { type: "cancel" };
    }

    console.error(AUTH_MESSAGES.ERROR.GOOGLE_SIGN_IN, error);
    return { type: "cancel" };
  }
};

const signOutFromGoogle = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(AUTH_MESSAGES.ERROR.SIGN_OUT, error);
  }
};

const checkSignInStatus = async (): Promise<boolean> => {
  try {
    const userInfo = await GoogleSignin.getCurrentUser();
    return userInfo !== null;
  } catch (error) {
    console.error(AUTH_MESSAGES.ERROR.CHECK_STATUS, error);
    return false;
  }
};

const getCurrentUser = async (): Promise<GoogleUser | null> => {
  try {
    const userInfo = await GoogleSignin.getCurrentUser();

    if (!userInfo) {
      return null;
    }

    return {
      id: userInfo.user.id,
      email: userInfo.user.email,
      name: userInfo.user.name || "",
    };
  } catch (error) {
    console.error(AUTH_MESSAGES.ERROR.GET_CURRENT_USER, error);
    return null;
  }
};

export {
  configureGoogleSignIn,
  signInWithGoogle,
  signOutFromGoogle,
  checkSignInStatus,
  getCurrentUser,
};
