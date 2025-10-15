import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storage";
import NOTIFICATION_CONSTANTS from "../constants/notification";
import {
  scheduleNotification,
  cancelNotification,
  cancelAllNotifications,
  saveScheduledNotifications,
} from "../services/notificationService";
import {
  NotificationState,
  NotificationEvent,
  ScheduledNotification,
} from "../types/notification";

const useNotificationStore = create<NotificationState>((set, get) => ({
  scheduledNotifications: {},

  scheduleNotificationsForEvents: async (events: NotificationEvent[]) => {
    const notificationsEnabled = await AsyncStorage.getItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED
    );

    if (notificationsEnabled !== "true") {
      return;
    }

    const now = Date.now();
    const scheduled: Record<string, ScheduledNotification> = {};

    for (const event of events) {
      const eventStart = new Date(event.startTime).getTime();

      if (eventStart <= now) {
        continue;
      }

      const notifyTime =
        eventStart - NOTIFICATION_CONSTANTS.ADVANCE_MINUTES * 60 * 1000;

      if (notifyTime <= now) {
        continue;
      }

      try {
        const notificationId = await scheduleNotification(
          event.id,
          notifyTime,
          `${NOTIFICATION_CONSTANTS.MESSAGE.TITLE_PREFIX}${event.title}`,
          NOTIFICATION_CONSTANTS.MESSAGE.BODY
        );

        scheduled[event.id] = {
          eventId: event.id,
          notificationId,
          eventTitle: event.title,
          scheduledTime: notifyTime,
        };
      } catch (error) {
        console.error(
          NOTIFICATION_CONSTANTS.ERROR.SCHEDULE_EVENT_FAILED,
          event.id,
          error
        );
      }
    }

    set({ scheduledNotifications: scheduled });
    await saveScheduledNotifications(Object.values(scheduled));
  },

  cancelNotificationForEvent: async (eventId: string) => {
    try {
      await cancelNotification(eventId);
      const current = get().scheduledNotifications;
      const updated = { ...current };
      delete updated[eventId];

      set({ scheduledNotifications: updated });
      await saveScheduledNotifications(Object.values(updated));
    } catch (error) {
      console.error(NOTIFICATION_CONSTANTS.ERROR.CANCEL_FAILED, eventId, error);
    }
  },

  clearAllNotifications: async () => {
    try {
      await cancelAllNotifications();
      set({ scheduledNotifications: {} });
    } catch (error) {
      console.error(NOTIFICATION_CONSTANTS.ERROR.CLEAR_ALL_FAILED, error);
    }
  },
}));

export default useNotificationStore;
