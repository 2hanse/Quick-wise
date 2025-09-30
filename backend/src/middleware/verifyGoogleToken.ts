import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid token payload");
    }

    return {
      sub: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch (error) {
    console.error("Google token verification error:", error);
    throw new Error("Invalid Google token");
  }
};

export { verifyGoogleToken, GoogleTokenPayload };
