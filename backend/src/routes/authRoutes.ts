import express from "express";
import { verifyGoogleToken } from "../middleware/verifyGoogleToken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";
import { User } from "../models/User";
import constants from "../constants/messages";

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

export default router;
