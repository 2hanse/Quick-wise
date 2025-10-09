import { Request, Response, NextFunction } from "express";
import constants from "../constants/messages";
import validateDateRange from "../utils/dateValidator";
import { CreateEventRequest, UpdateEventRequest } from "../types/calendar";

const validateDateRangeQuery = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    res.status(400).json({
      error: constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE,
    });
    return;
  }

  if (typeof startDate !== "string" || typeof endDate !== "string") {
    res.status(400).json({
      error: constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE,
    });
    return;
  }

  try {
    validateDateRange(startDate, endDate);
    next();
  } catch (validationError) {
    res.status(400).json({
      error:
        validationError instanceof Error
          ? validationError.message
          : constants.ERROR_MESSAGES.CALENDAR.INVALID_DATE_RANGE,
    });
  }
};

const validateEventData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, startTime, endTime, isAllDay } = req.body as
    | CreateEventRequest
    | UpdateEventRequest;

  if (!title || !startTime || !endTime || isAllDay === undefined) {
    res.status(400).json({
      error: constants.ERROR_MESSAGES.CALENDAR.REQUIRED_FIELD_MISSING,
    });
    return;
  }

  if (new Date(endTime) <= new Date(startTime)) {
    res.status(400).json({
      error: constants.ERROR_MESSAGES.CALENDAR.END_TIME_BEFORE_START,
    });
    return;
  }

  next();
};

const validateEventId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id || id.trim() === "") {
    res.status(400).json({
      error: constants.ERROR_MESSAGES.CALENDAR.EVENT_NOT_FOUND,
    });
    return;
  }

  next();
};

export { validateDateRangeQuery, validateEventData, validateEventId };
