import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import { Event } from "../models/Event";
import { getTodayDateRange } from "../utils/dateUtils";
import constants from "../constants/messages";
import { processEventImmediately } from "../services/ai/eventProcessor";
import { RetryEventRequest } from "../types/ai";
import { wrapError } from "../utils/ai/errorHandler";

const handleError = (
  error: unknown,
  res: Response,
  logPrefix: string
): void => {
  const wrappedError =
    error instanceof Error ? error : wrapError(error, logPrefix);

  console.error(logPrefix, wrappedError.message, error);

  const statusCode = (() => {
    if (wrappedError.message === constants.ERROR_MESSAGES.EVENT.NOT_FOUND)
      return 404;
    if (wrappedError.message === constants.ERROR_MESSAGES.AI.QUOTA_EXCEEDED)
      return 429;
    if (
      wrappedError.message ===
      constants.ERROR_MESSAGES.EVENT.UNSUPPORTED_CATEGORY
    )
      return 400;
    return 500;
  })();

  res.status(statusCode).json({ error: wrappedError.message });
};

const getEventAIContent = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;

    const event = await Event.findOne({
      _id: eventId,
      userId: req.userId,
    });

    if (!event) {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.EVENT.NOT_FOUND),
        constants.LOG_PREFIXES.AI_PROCESSING
      );
    }

    const response = {
      status: event.aiContent?.status || "pending",
      cards: event.aiContent?.cards || [],
      keywords: event.aiContent?.keywords || [],
      processedAt: event.aiContent?.processedAt,
      error: event.aiContent?.error,
    };

    res.json(response);
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.AI_PROCESSING);
  }
};

const getTodayAIContent = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { startDate, endDate } = getTodayDateRange();

    const events = await Event.find({
      userId: req.userId,
      startTime: { $gte: new Date(startDate), $lt: new Date(endDate) },
      category: { $exists: true, $ne: null },
    }).sort({ startTime: 1 });

    const eventsWithAI = events.map((event) => ({
      _id: event._id.toString(),
      googleEventId: event.googleEventId,
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      category: event.category,
      aiContent: event.aiContent || {
        status: "pending",
        cards: [],
        keywords: [],
      },
    }));

    res.json({ events: eventsWithAI });
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.AI_PROCESSING);
  }
};

const retryEventAIContent = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { excludeVideoIds } = req.body as RetryEventRequest;

    const event = await Event.findOne({
      _id: eventId,
      userId: req.userId,
    });

    if (!event) {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.EVENT.NOT_FOUND),
        constants.LOG_PREFIXES.AI_PROCESSING
      );
    }

    const errorType = event.aiContent?.errorType;

    if (errorType === "quota_exceeded") {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.AI.QUOTA_EXCEEDED),
        constants.LOG_PREFIXES.AI_PROCESSING
      );
    }

    if (errorType === "unsupported_category") {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.EVENT.UNSUPPORTED_CATEGORY),
        constants.LOG_PREFIXES.AI_PROCESSING
      );
    }

    if (excludeVideoIds && excludeVideoIds.length > 0) {
      await Event.findByIdAndUpdate(eventId, {
        "aiContent.usedVideoIds": [
          ...(event.aiContent?.usedVideoIds || []),
          ...excludeVideoIds,
        ],
      });
    }

    console.log(
      `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.RETRY_STARTED}: ${eventId}`
    );

    processEventImmediately(eventId).catch((err) => {
      console.error(
        `${constants.LOG_PREFIXES.AI_PROCESSING} Retry failed for ${eventId}:`,
        err
      );
    });

    res.json({
      success: true,
      message: "AI processing retry started",
      status: "processing",
    });
  } catch (error) {
    handleError(error, res, constants.LOG_PREFIXES.AI_PROCESSING);
  }
};

export { getEventAIContent, getTodayAIContent, retryEventAIContent };
