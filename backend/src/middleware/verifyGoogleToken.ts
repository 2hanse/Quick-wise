import { OAuth2Client } from "google-auth-library";
import constants from "../constants/messages";

const clientId = process.env.GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error(constants.ERROR_MESSAGES.GOOGLE_AUTH.CLIENT_ID_NOT_DEFINED);
}

const client = new OAuth2Client(clientId);

interface GoogleTokenPayload {
  sub: string;
  email: string;
  name: string;
}

const verifyGoogleToken = async (
  idToken: string
): Promise<GoogleTokenPayload> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error(constants.ERROR_MESSAGES.GOOGLE_AUTH.INVALID_PAYLOAD);
    }

    return {
      sub: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch (error) {
    console.error(
      constants.ERROR_MESSAGES.GOOGLE_AUTH.VERIFICATION_FAILED,
      error
    );
    throw new Error(constants.ERROR_MESSAGES.GOOGLE_AUTH.INVALID_TOKEN);
  }
};

export { verifyGoogleToken, GoogleTokenPayload };
