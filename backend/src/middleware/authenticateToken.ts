import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtToken";
import constants from "../constants/messages";

interface AuthRequest extends Request {
  userId?: string;
}

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({
        error: constants.ERROR_MESSAGES.AUTH.TOKEN_REQUIRED,
      });
      return;
    }

    const token = authHeader.substring(7);

    const decoded = verifyToken(token);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(constants.ERROR_MESSAGES.AUTH.UNAUTHORIZED, error);
    res.status(401).json({
      error: constants.ERROR_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }
};

export { authenticateToken, AuthRequest };
