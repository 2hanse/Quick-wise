import { Request, Response, NextFunction } from "express";
import constants from "../constants/messages";
import { ErrorWithStatus } from "../types/error";

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status || 500;
  const message =
    err.message || constants.ERROR_MESSAGES.CALENDAR.FAILED_TO_FETCH_EVENTS;

  console.error(
    `${constants.LOG_PREFIXES.GENERAL_ERROR} ${status}: ${message}`,
    err
  );

  res.status(status).json({
    error: message,
  });
};

export default errorHandler;
