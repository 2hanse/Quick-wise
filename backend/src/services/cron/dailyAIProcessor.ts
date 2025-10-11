import cron from "node-cron";
import { Event } from "../../models/Event";
import { processEventWithAI } from "../ai/aiPipeline";
import constants from "../../constants/messages";

const processTodayEvents = async (): Promise<void> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const events = await Event.find({
      startTime: { $gte: today, $lt: tomorrow },
      category: { $exists: true, $ne: null },
      $or: [
        { "aiContent.status": { $exists: false } },
        { "aiContent.status": "pending" },
        { "aiContent.status": "failed" },
      ],
    });

    for (const event of events) {
      await Event.updateOne(
        { _id: event._id },
        { $set: { "aiContent.status": "processing" } }
      );

      const result = await processEventWithAI(
        event.title,
        event.description || "",
        event.category!,
        event.aiContent?.usedVideoIds || []
      );

      if (result.success && result.cards) {
        await Event.updateOne(
          { _id: event._id },
          {
            $set: {
              "aiContent.status": "completed",
              "aiContent.cards": result.cards,
              "aiContent.keywords": result.keywords,
              "aiContent.usedVideoIds": result.usedVideoIds,
              "aiContent.processedAt": new Date(),
            },
          }
        );
      } else {
        await Event.updateOne(
          { _id: event._id },
          {
            $set: {
              "aiContent.status": "failed",
              "aiContent.error": result.error,
              "aiContent.processedAt": new Date(),
            },
          }
        );

        console.error(
          `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.CRON.EVENT_FAILED}: ${event.title} - ${result.error}`
        );
      }
    }
  } catch (error) {
    console.error(
      `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.CRON.DAILY_PROCESSING_ERROR}:`,
      error
    );
  }
};

const startDailyProcessor = (): void => {
  cron.schedule("0 0 * * *", () => {
    console.log(
      `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.CRON.DAILY_PROCESSOR_STARTED}`
    );
    processTodayEvents().catch(console.error);
  });

  console.log(
    `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.CRON.DAILY_PROCESSOR_SCHEDULED}`
  );
};

export { startDailyProcessor, processTodayEvents };
