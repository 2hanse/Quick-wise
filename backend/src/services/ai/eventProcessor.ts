import { Event } from "../../models/Event";
import { processEventWithAI } from "./aiPipeline";
import constants from "../../constants/messages";
import AI_CONSTANTS from "../../constants/ai";
import { SupportedCategory } from "../../types/ai";

const normalizeCategory = (category: string): string | null => {
  const normalized = category.toLowerCase().trim();

  if (
    AI_CONSTANTS.SUPPORTED_CATEGORIES.includes(normalized as SupportedCategory)
  ) {
    return normalized;
  }

  const categoryMap = constants.EVENT_CATEGORY;
  const categoryEntry = Object.values(categoryMap).find((entry) =>
    entry.KEYWORDS.some((keyword) => normalized.includes(keyword.toLowerCase()))
  );

  return categoryEntry?.VALUE || null;
};

const determineErrorType = (errorMessage: string): string => {
  const lowerMessage = (errorMessage || "").toLowerCase();

  if (
    AI_CONSTANTS.ERROR_KEYWORDS.QUOTA.some((keyword) =>
      lowerMessage.includes(keyword)
    )
  ) {
    return AI_CONSTANTS.ERROR_TYPES.QUOTA_EXCEEDED;
  }

  if (
    AI_CONSTANTS.ERROR_KEYWORDS.UNSUPPORTED_CATEGORY.some((keyword) =>
      lowerMessage.includes(keyword)
    )
  ) {
    return AI_CONSTANTS.ERROR_TYPES.UNSUPPORTED_CATEGORY;
  }

  return AI_CONSTANTS.ERROR_TYPES.TEMPORARY_ERROR;
};

const processEventImmediately = async (eventId: string): Promise<void> => {
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error(constants.ERROR_MESSAGES.EVENT.NOT_FOUND);
    }

    if (event.aiContent?.status === "completed") {
      return;
    }

    if (!event.category) {
      return;
    }

    const normalizedCategory = normalizeCategory(event.category);

    if (!normalizedCategory) {
      return;
    }

    await Event.findByIdAndUpdate(eventId, {
      "aiContent.status": "processing",
    });

    const result = await processEventWithAI(
      event.title,
      event.description || "",
      normalizedCategory,
      event.aiContent?.usedVideoIds || []
    );

    if (result.success && result.cards && result.cards.length > 0) {
      await Event.findByIdAndUpdate(eventId, {
        aiContent: {
          status: "completed",
          cards: result.cards,
          keywords: result.keywords || [],
          usedVideoIds: result.usedVideoIds || [],
          processedAt: new Date(),
        },
      });

      console.log(
        `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.PROCESSING_COMPLETE}: ${eventId}`
      );
    } else {
      const errorType = determineErrorType(result.error || "");

      await Event.findByIdAndUpdate(eventId, {
        "aiContent.status": "failed",
        "aiContent.error": result.error || "No cards generated",
        "aiContent.errorType": errorType,
      });

      console.error(
        `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.PROCESSING_FAILED}: ${eventId} - ${result.error || "No cards generated"}`
      );
    }
  } catch (error) {
    const errorType = determineErrorType(
      error instanceof Error ? error.message : ""
    );

    await Event.findByIdAndUpdate(eventId, {
      "aiContent.status": "failed",
      "aiContent.error":
        error instanceof Error
          ? error.message
          : constants.ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR,
      "aiContent.errorType": errorType,
    });

    throw error;
  }
};

const processTodayEvents = async (userId: string): Promise<void> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const events = await Event.find({
    userId,
    startTime: { $gte: today, $lt: tomorrow },
    category: { $exists: true, $ne: null },
    $or: [
      { aiContent: { $exists: false } },
      { "aiContent.status": "pending" },
      {
        "aiContent.status": "failed",
        "aiContent.cards": { $exists: false },
      },
    ],
  });

  for (const event of events) {
    try {
      await processEventImmediately(event._id.toString());
    } catch (error) {
      console.error(
        `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.EVENT_PROCESSING_FAILED}: ${event._id}`,
        error
      );
    }
  }
};

export { processEventImmediately, processTodayEvents, normalizeCategory };
