import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storage";
import NOTIFICATION_CONSTANTS from "../constants/notification";
import {
  scheduleNotification,
  cancelNotification,
  cancelAllNotifications,
  saveScheduledNotifications,
  getScheduledNotifications,
} from "../services/notificationService";
import {
  NotificationState,
  NotificationEvent,
  ScheduledNotification,
} from "../types/notification";

const useNotificationStore = create<NotificationState>((set, get) => ({
  scheduledNotifications: {},

  scheduleNotificationsForEvents: async (events: NotificationEvent[]) => {
    const enabled = JSON.parse(
      (await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED)) ??
        "false"
    );

    if (!enabled) {
      return;
    }

    const now = Date.now();
    const currentScheduled = get().scheduledNotifications;
    const scheduled: Record<string, ScheduledNotification> = {
      ...currentScheduled,
    };

    for (const event of events) {
      if (event.isAllDay) continue;

      const eventStart = new Date(event.startTime).getTime();
      if (isNaN(eventStart) || eventStart <= now) continue;

      if (scheduled[event.id]) continue;

      const notifyTime =
        eventStart -
        NOTIFICATION_CONSTANTS.ADVANCE_MINUTES *
          NOTIFICATION_CONSTANTS.MILLISECONDS.MINUTE;

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
        console.error(NOTIFICATION_CONSTANTS.ERROR.SCHEDULE_FAILED, error);
      }
    }

    set({ scheduledNotifications: scheduled });
    await saveScheduledNotifications(Object.values(scheduled));
  },

  cancelNotification: async (eventId: string) => {
    try {
      await cancelNotification(eventId);
      set((state) => {
        const updated = { ...state.scheduledNotifications };
        delete updated[eventId];
        return { scheduledNotifications: updated };
      });
    } catch (error) {
      console.error(NOTIFICATION_CONSTANTS.ERROR.CANCEL_FAILED, error);
    }
  },

  cancelAllNotifications: async () => {
    try {
      await cancelAllNotifications();
      set({ scheduledNotifications: {} });
    } catch (error) {
      console.error(NOTIFICATION_CONSTANTS.ERROR.CANCEL_FAILED, error);
    }
  },

  loadScheduledNotifications: async () => {
    const notifications = await getScheduledNotifications();
    const mapped = notifications.reduce(
      (acc, notification) => {
        acc[notification.eventId] = notification;
        return acc;
      },
      {} as Record<string, ScheduledNotification>
    );
    set({ scheduledNotifications: mapped });
  },
}));

export default useNotificationStore;
