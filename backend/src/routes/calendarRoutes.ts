import express from "express";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/authenticateToken";
import { User } from "../models/User";
import { getCalendarEvents } from "../services/calendar/calendarReader";
import { createCalendarEvent } from "../services/calendar/calendarCreator";
import validateDateRange from "../utils/dateValidator";
import constants from "../constants/messages";
import { CreateEventRequest } from "../types/calendar";

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

    const { events, tokenRefreshed } = await getCalendarEvents(
      user,
      startDate,
      endDate
    );

    res.json({
      message: constants.SUCCESS.CALENDAR.EVENTS_FETCHED,
      events,
      tokenRefreshed,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS;

    console.error(constants.LOG_PREFIXES.CALENDAR_ERROR, errorMessage, error);

    if (
      errorMessage === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED ||
      errorMessage ===
        constants.ERROR_MESSAGES.GOOGLE_AUTH.REFRESH_TOKEN_NOT_FOUND
    ) {
      return res.status(401).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED) {
      return res.status(403).json({ error: errorMessage });
    }

    if (
      errorMessage === constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR ||
      errorMessage === constants.ERROR_MESSAGES.GOOGLE_AUTH.TOKEN_REFRESH_FAILED
    ) {
      return res.status(502).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR) {
      return res.status(503).json({ error: errorMessage });
    }

    res.status(500).json({ error: errorMessage });
  }
});

router.post("/events", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, startTime, endTime, location, description, isAllDay } =
      req.body as CreateEventRequest;

    if (!title || !startTime || !endTime || isAllDay === undefined) {
      return res.status(400).json({
        error: constants.ERROR_MESSAGES.CALENDAR.REQUIRED_FIELD_MISSING,
      });
    }

    if (new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({
        error: constants.ERROR_MESSAGES.CALENDAR.END_TIME_BEFORE_START,
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

    const eventData: CreateEventRequest = {
      title,
      startTime,
      endTime,
      location,
      description,
      isAllDay,
    };

    const { event, tokenRefreshed } = await createCalendarEvent(
      user,
      eventData
    );

    res.status(201).json({
      message: constants.SUCCESS.CALENDAR.EVENT_CREATED,
      event,
      tokenRefreshed,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_CREATE_EVENT;

    console.error(constants.LOG_PREFIXES.EVENT_CREATE, errorMessage, error);

    if (
      errorMessage === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED ||
      errorMessage ===
        constants.ERROR_MESSAGES.GOOGLE_AUTH.REFRESH_TOKEN_NOT_FOUND
    ) {
      return res.status(401).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED) {
      return res.status(403).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.INVALID_EVENT_DATA) {
      return res.status(400).json({ error: errorMessage });
    }

    if (
      errorMessage === constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR ||
      errorMessage === constants.ERROR_MESSAGES.GOOGLE_AUTH.TOKEN_REFRESH_FAILED
    ) {
      return res.status(502).json({ error: errorMessage });
    }

    if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR) {
      return res.status(503).json({ error: errorMessage });
    }

    res.status(500).json({ error: errorMessage });
  }
});

export default router;
