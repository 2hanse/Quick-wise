import cron from "node-cron";
import { Event } from "../../models/Event";
import { processEventImmediately } from "../ai/eventProcessor";
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
      try {
        await processEventImmediately(event._id.toString());
      } catch (error) {
        console.error(
          `${constants.LOG_PREFIXES.AI_PROCESSING} ${constants.LOG_MESSAGES.CRON.EVENT_FAILED}: ${event.title}`,
          error
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
