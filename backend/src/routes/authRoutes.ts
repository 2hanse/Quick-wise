import express from "express";
import { verifyGoogleToken } from "../middleware/verifyGoogleToken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwtToken";
import { User } from "../models/User";
import constants from "../constants/messages";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/authenticateToken";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        error: constants.ERROR_MESSAGES.AUTH.ID_TOKEN_REQUIRED,
      });
    }

    const googleUser = await verifyGoogleToken(idToken);

    let user = await User.findOne({ googleId: googleUser.sub });

    if (!user) {
      user = await User.create({
        googleId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        lastLoginAt: new Date(),
      });
    } else {
      user.lastLoginAt = new Date();
      await user.save();
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(constants.ERROR_MESSAGES.AUTH.AUTHENTICATION_FAILED, error);
    res.status(401).json({
      error: constants.ERROR_MESSAGES.AUTH.AUTHENTICATION_FAILED,
    });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: constants.ERROR_MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED,
      });
    }

    const decoded = verifyToken(refreshToken);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: constants.ERROR_MESSAGES.AUTH.INVALID_REFRESH_TOKEN,
      });
    }

    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error(constants.ERROR_MESSAGES.AUTH.INVALID_REFRESH_TOKEN, error);
    res.status(401).json({
      error: constants.ERROR_MESSAGES.AUTH.INVALID_REFRESH_TOKEN,
    });
  }
});

router.get("/me", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        error: constants.ERROR_MESSAGES.USER.NOT_FOUND,
      });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(constants.ERROR_MESSAGES.USER.FAILED_TO_GET_INFO, error);
    res.status(500).json({
      error: constants.ERROR_MESSAGES.USER.FAILED_TO_GET_INFO,
    });
  }
});

export default router;
