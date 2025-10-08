import axios from "axios";
import constants from "../../constants/messages";
import { GoogleTokenRefreshResponse } from "../../types/calendar";

const refreshGoogleAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        constants.ERROR_MESSAGES.GOOGLE_AUTH.CLIENT_ID_NOT_DEFINED
      );
    }

    const response = await axios.post<GoogleTokenRefreshResponse>(
      constants.GOOGLE_OAUTH.TOKEN_URL,
      {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: constants.GOOGLE_OAUTH.GRANT_TYPE_REFRESH,
      },
      {
        headers: {
          "Content-Type": constants.GOOGLE_OAUTH.CONTENT_TYPE_FORM,
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
    };
  } catch (error) {
    console.error(constants.LOG_PREFIXES.TOKEN_REFRESH, error);
    throw new Error(constants.ERROR_MESSAGES.GOOGLE_AUTH.TOKEN_REFRESH_FAILED);
  }
};

export { refreshGoogleAccessToken };
