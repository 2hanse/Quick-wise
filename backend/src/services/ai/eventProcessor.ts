import { Event } from "../../models/Event";
import { processEventWithAI } from "./aiPipeline";
import constants from "../../constants/messages";

const processEventImmediately = async (eventId: string): Promise<void> => {
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error(constants.ERROR_MESSAGES.EVENT.NOT_FOUND);
    }

    if (!event.category) {
      console.log(
        `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.CATEGORY_MISSING}: ${eventId}`
      );
      return;
    }

    await Event.findByIdAndUpdate(eventId, {
      "aiContent.status": "processing",
    });

    const result = await processEventWithAI(
      event.title,
      event.description || "",
      event.category,
      event.aiContent?.usedVideoIds || []
    );

    if (result.success && result.cards) {
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
      await Event.findByIdAndUpdate(eventId, {
        "aiContent.status": "failed",
        "aiContent.error": result.error,
      });

      console.error(
        `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.AI.PROCESSING_FAILED}: ${eventId} - ${result.error}`
      );
    }
  } catch (error) {
    await Event.findByIdAndUpdate(eventId, {
      "aiContent.status": "failed",
      "aiContent.error":
        error instanceof Error
          ? error.message
          : constants.ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR,
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
      { "aiContent.status": "failed" },
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

export { processEventImmediately, processTodayEvents };
