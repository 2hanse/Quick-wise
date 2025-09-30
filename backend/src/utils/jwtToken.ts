import jwt from "jsonwebtoken";
import constants from "../constants/errorMessage";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(constants.ERROR_MESSAGES.AUTH.JWT_SECRET_NOT_DEFINED);
  }
  return secret;
};

const JWT_SECRET = getJwtSecret();
const ACCESS_EXPIRATION = constants.JWT.ACCESS_TOKEN_EXPIRATION;
const REFRESH_EXPIRATION = constants.JWT.REFRESH_TOKEN_EXPIRATION;

interface TokenPayload {
  userId: string;
}

const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRATION,
  });
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRATION,
  });
};

const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error(`${constants.ERROR_MESSAGES.AUTH.JWT_VERIFICATION_FAILED}:`, error);
    throw new Error(constants.ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN);
  }
};

export { generateAccessToken, generateRefreshToken, verifyToken, TokenPayload };
