import express from "express";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/authenticateToken";
import { User } from "../models/User";
import { fetchCalendarEvents } from "../services/googleCalendarService";
import validateDateRange from "../utils/dateValidator";
import constants from "../constants/messages";

const router = express.Router();

router.get("/events", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE,
      });
    }

    validateDateRange(startDate as string, endDate as string);

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        error: constants.ERROR_MESSAGES.USER.NOT_FOUND,
      });
    }

    if (!user.googleAccessToken) {
      return res.status(401).json({
        error: constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND,
      });
    }

    const events = await fetchCalendarEvents(
      user.googleAccessToken,
      startDate as string,
      endDate as string
    );

    res.json({
      message: constants.SUCCESS.CALENDAR.EVENTS_FETCHED,
      events,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS;

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED) {
      return res.status(401).json({ error: errorMessage });
    }

    res.status(500).json({ error: errorMessage });
  }
});

export default router;
