import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import { Event } from "../models/Event";
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

export { getEventAIContent, getTodayAIContent };
