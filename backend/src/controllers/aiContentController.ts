import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import { Event } from "../models/Event";
import { getTodayDateRange } from "../utils/dateUtils";
import constants from "../constants/messages";
import { processEventImmediately } from "../services/ai/eventProcessor";
import { RetryEventRequest } from "../types/ai";

const handleError = (
  error: unknown,
  res: Response,
  logPrefix: string
): void => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : constants.ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR;

  console.error(logPrefix, errorMessage, error);

  if (errorMessage === constants.ERROR_MESSAGES.EVENT.NOT_FOUND) {
    res.status(404).json({ error: errorMessage });
    return;
  }

  res.status(500).json({ error: errorMessage });
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
      res.status(404).json({ error: constants.ERROR_MESSAGES.EVENT.NOT_FOUND });
      return;
    }

    if (!event.aiContent) {
      res.json({
        status: "pending",
        cards: [],
        keywords: [],
      });
      return;
    }

    res.json({
      status: event.aiContent.status,
      cards: event.aiContent.cards || [],
      keywords: event.aiContent.keywords || [],
      processedAt: event.aiContent.processedAt,
      error: event.aiContent.error,
    });
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
      res.status(404).json({ error: constants.ERROR_MESSAGES.EVENT.NOT_FOUND });
      return;
    }

    const errorType = event.aiContent?.errorType;

    if (errorType === "quota_exceeded") {
      res.status(429).json({
        success: false,
        message: constants.ERROR_MESSAGES.AI.QUOTA_EXCEEDED,
        canRetry: false,
      });
      return;
    }

    if (errorType === "unsupported_category") {
      res.status(400).json({
        success: false,
        message: constants.ERROR_MESSAGES.EVENT.UNSUPPORTED_CATEGORY,
        canRetry: false,
      });
      return;
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

    await processEventImmediately(eventId);

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
