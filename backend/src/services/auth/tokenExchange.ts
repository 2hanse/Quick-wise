import axios from "axios";
import constants from "../../constants/messages";

interface TokenExchangeResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

const exchangeAuthCodeForTokens = async (
  authCode: string
): Promise<TokenExchangeResponse> => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        constants.ERROR_MESSAGES.GOOGLE_AUTH.CLIENT_ID_NOT_DEFINED
      );
    }

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: authCode,
      grant_type: "authorization_code",
      redirect_uri: "",
    });

    const response = await axios.post<TokenExchangeResponse>(
      constants.GOOGLE_OAUTH.TOKEN_URL,
      params.toString(),
      {
        headers: {
          "Content-Type": constants.GOOGLE_OAUTH.CONTENT_TYPE_FORM,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[Token Exchange Error]", error);
    throw new Error("Failed to exchange authorization code for tokens");
  }
};

export { exchangeAuthCodeForTokens };
