import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import { CreateEventRequest, UpdateEventRequest } from "../types/calendar";
import { getCalendarEvents } from "../services/calendar/calendarReader";
import { createCalendarEvent } from "../services/calendar/calendarCreator";
import { updateCalendarEvent } from "../services/calendar/calendarUpdater";
import { deleteCalendarEvent } from "../services/calendar/calendarDeleter";
import { syncCalendarEvents } from "../services/sync/calendarSynchronizer";
import { getUserById, validateUserTokens } from "../services/userService";
import { getTodayDateRange } from "../utils/dateUtils";
import constants from "../constants/messages";

const handleError = (
  error: unknown,
  res: Response,
  logPrefix: string
): void => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS;

  console.error(logPrefix, errorMessage, error);

  if (
    errorMessage === constants.ERROR_MESSAGES.CALENDAR.TOKEN_EXPIRED ||
    errorMessage ===
      constants.ERROR_MESSAGES.GOOGLE_AUTH.REFRESH_TOKEN_NOT_FOUND
  ) {
    res.status(401).json({ error: errorMessage });
    return;
  }

  if (errorMessage === constants.ERROR_MESSAGES.USER.NOT_FOUND) {
    res.status(404).json({ error: errorMessage });
    return;
  }

  if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.PERMISSION_DENIED) {
    res.status(403).json({ error: errorMessage });
    return;
  }

  if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.EVENT_NOT_FOUND) {
    res.status(404).json({ error: errorMessage });
    return;
  }

  if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.INVALID_EVENT_DATA) {
    res.status(400).json({ error: errorMessage });
    return;
  }

  if (
    errorMessage === constants.ERROR_MESSAGES.CALENDAR.GOOGLE_API_ERROR ||
    errorMessage === constants.ERROR_MESSAGES.GOOGLE_AUTH.TOKEN_REFRESH_FAILED
  ) {
    res.status(502).json({ error: errorMessage });
    return;
  }

  if (errorMessage === constants.ERROR_MESSAGES.CALENDAR.SERVER_ERROR) {
    res.status(503).json({ error: errorMessage });
    return;
  }

  res.status(500).json({ error: errorMessage });
};

const getEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query as {
      startDate: string;
      endDate: string;
    };

    const user = await getUserById(req.userId!);
    validateUserTokens(user);

    await syncCalendarEvents(user, startDate, endDate);

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
    handleError(error, res, constants.LOG_PREFIXES.CALENDAR_ERROR);
  }
};

const getTodayEvents = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { startDate, endDate } = getTodayDateRange();

    const user = await getUserById(req.userId!);
    validateUserTokens(user);

    await syncCalendarEvents(user, startDate, endDate);

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
    handleError(error, res, constants.LOG_PREFIXES.CALENDAR_ERROR);
  }
};

const createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const eventData = req.body as CreateEventRequest;
    const user = await getUserById(req.userId!);
    validateUserTokens(user);

    const { event, tokenRefreshed } = await createCalendarEvent(
      user,
      eventData
    );

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    await syncCalendarEvents(user, today.toISOString(), tomorrow.toISOString());

    res.status(201).json({
      message: constants.SUCCESS.CALENDAR.EVENT_CREATED,
      event,
      tokenRefreshed,
    });
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.EVENT_CREATE);
  }
};

const updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eventData = req.body as UpdateEventRequest;

    const user = await getUserById(req.userId!);
    validateUserTokens(user);

    const { event, tokenRefreshed } = await updateCalendarEvent(
      user,
      id,
      eventData
    );

    res.json({
      message: constants.SUCCESS.CALENDAR.EVENT_UPDATED,
      event,
      tokenRefreshed,
    });
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.EVENT_UPDATE);
  }
};

const deleteEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await getUserById(req.userId!);
    validateUserTokens(user);

    const { tokenRefreshed } = await deleteCalendarEvent(user, id);

    res.json({
      message: constants.SUCCESS.CALENDAR.EVENT_DELETED,
      tokenRefreshed,
    });
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.EVENT_DELETE);
  }
};

const syncEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query as {
      startDate: string;
      endDate: string;
    };

    const user = await getUserById(req.userId!);
    validateUserTokens(user);

    const { tokenRefreshed } = await syncCalendarEvents(
      user,
      startDate,
      endDate
    );

    res.json({
      message: constants.SUCCESS.CALENDAR.SYNC_COMPLETED,
      tokenRefreshed,
    });
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.CALENDAR_SYNC);
  }
};

export {
  getEvents,
  getTodayEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  syncEvents,
};
