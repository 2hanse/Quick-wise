import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthResult, GoogleUser, GoogleTokens } from "../types/auth";

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
      picture: userData.user.photo || "",
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
      console.error("Play Services not available");
      return { type: "cancel" };
    }

    console.error("Google Sign-In error:", error);
    return { type: "cancel" };
  }
};

export { configureGoogleSignIn, signInWithGoogle };
