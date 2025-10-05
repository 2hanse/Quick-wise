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

    if (typeof startDate !== "string" || typeof endDate !== "string") {
      return res.status(400).json({
        error: constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE,
      });
    }

    try {
      validateDateRange(startDate, endDate);
    } catch (validationError) {
      return res.status(400).json({
        error:
          validationError instanceof Error
            ? validationError.message
            : constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE,
      });
    }

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

    console.error(constants.LOG_PREFIXES.CALENDAR_ERROR, errorMessage, error);

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED) {
      return res.status(401).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED) {
      return res.status(403).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR) {
      return res.status(502).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR) {
      return res.status(503).json({ error: errorMessage });
    }

    res.status(500).json({ error: errorMessage });
  }
});

export default router;
