import { IUser } from "../../../models/User";
import { refreshGoogleAccessToken } from "../tokenManager";
import constants from "../../../constants/messages";
import { isTokenExpiredError } from "./errorValidator";

interface TokenRefreshResult<T> {
  data: T;
  tokenRefreshed: boolean;
}

const withTokenRefresh = async <T>(
  user: IUser,
  apiCall: (accessToken: string) => Promise<T>
): Promise<TokenRefreshResult<T>> => {
  if (!user.googleAccessToken) {
    throw new Error(
      constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND
    );
  }

  try {
    const data = await apiCall(user.googleAccessToken);
    return { data, tokenRefreshed: false };
  } catch (error) {
    if (!isTokenExpiredError(error)) {
      throw error;
    }

    if (!user.googleRefreshToken) {
      throw new Error(
        constants.ERROR_MESSAGES.GOOGLE_AUTH.REFRESH_TOKEN_NOT_FOUND
      );
    }

    const { accessToken, expiresIn } = await refreshGoogleAccessToken(
      user.googleRefreshToken
    );

    user.googleAccessToken = accessToken;
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setSeconds(tokenExpiresAt.getSeconds() + expiresIn);
    user.tokenExpiresAt = tokenExpiresAt;
    await user.save();

    const data = await apiCall(accessToken);
    return { data, tokenRefreshed: true };
  }
};

export { withTokenRefresh };
