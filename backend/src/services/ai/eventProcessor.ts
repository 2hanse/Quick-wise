import { Event } from "../../models/Event";
import { processEventWithAI } from "./aiPipeline";
import {
  normalizeCategory,
  determineErrorType,
} from "../../utils/ai/categoryHelper";
import constants from "../../constants/messages";

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

export { processEventImmediately };
