import * as Notifications from "expo-notifications";
import { Platform, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NOTIFICATION_CONSTANTS from "../constants/notification";
import { STORAGE_KEYS } from "../constants/storage";
import {
  NotificationPermissionStatus,
  ScheduledNotification,
} from "../types/notification";

const { NotificationScheduler } = NativeModules;

const requestNotificationPermission =
  async (): Promise<NotificationPermissionStatus> => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return {
        granted: status === NOTIFICATION_CONSTANTS.PERMISSION.STATUS.GRANTED,
        status: status as "granted" | "denied" | "undetermined",
      };
    } catch (error) {
      console.error(NOTIFICATION_CONSTANTS.ERROR.PERMISSION_FAILED, error);
      return {
        granted: false,
        status: NOTIFICATION_CONSTANTS.PERMISSION.STATUS.DENIED,
      };
    }
  };

const createNotificationChannel = async (): Promise<void> => {
  if (Platform.OS !== NOTIFICATION_CONSTANTS.PLATFORM.ANDROID) return;

  try {
    await Notifications.setNotificationChannelAsync(
      NOTIFICATION_CONSTANTS.CHANNEL.ID,
      {
        name: NOTIFICATION_CONSTANTS.CHANNEL.NAME,
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: NOTIFICATION_CONSTANTS.VIBRATION_PATTERN,
        lightColor: "#FF231F7C",
        sound: "default",
      }
    );
  } catch (error) {
    console.error(NOTIFICATION_CONSTANTS.ERROR.CHANNEL_CREATION_FAILED, error);
  }
};

const getNotificationPermissionStatus =
  async (): Promise<NotificationPermissionStatus> => {
    const { status } = await Notifications.getPermissionsAsync();
    return {
      granted: status === NOTIFICATION_CONSTANTS.PERMISSION.STATUS.GRANTED,
      status: status as "granted" | "denied" | "undetermined",
    };
  };

const scheduleNotification = async (
  eventId: string,
  timestamp: number,
  title: string,
  body: string
): Promise<string> => {
  try {
    if (!NotificationScheduler) {
      throw new Error(NOTIFICATION_CONSTANTS.ERROR.MODULE_NOT_AVAILABLE);
    }

    await NotificationScheduler.scheduleNotification(
      eventId,
      timestamp,
      title,
      body
    );

    return eventId;
  } catch (error) {
    console.error(NOTIFICATION_CONSTANTS.ERROR.SCHEDULE_FAILED, error);
    throw error;
  }
};

const cancelNotification = async (eventId: string): Promise<void> => {
  try {
    if (!NotificationScheduler) {
      throw new Error(NOTIFICATION_CONSTANTS.ERROR.MODULE_NOT_AVAILABLE);
    }

    await NotificationScheduler.cancelNotification(eventId);
  } catch (error) {
    console.error(NOTIFICATION_CONSTANTS.ERROR.CANCEL_FAILED, error);
    throw error;
  }
};

const cancelAllNotifications = async (): Promise<void> => {
  try {
    if (!NotificationScheduler) {
      throw new Error(NOTIFICATION_CONSTANTS.ERROR.MODULE_NOT_AVAILABLE);
    }

    await NotificationScheduler.cancelAllNotifications();
    await AsyncStorage.removeItem(STORAGE_KEYS.SCHEDULED_NOTIFICATIONS);
  } catch (error) {
    console.error(NOTIFICATION_CONSTANTS.ERROR.CANCEL_FAILED, error);
    throw error;
  }
};

const saveScheduledNotifications = async (
  notifications: ScheduledNotification[]
): Promise<void> => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
    JSON.stringify(notifications)
  );
};

const getScheduledNotifications = async (): Promise<
  ScheduledNotification[]
> => {
  const stored = await AsyncStorage.getItem(
    STORAGE_KEYS.SCHEDULED_NOTIFICATIONS
  );
  return stored ? JSON.parse(stored) : [];
};

export {
  requestNotificationPermission,
  createNotificationChannel,
  getNotificationPermissionStatus,
  scheduleNotification,
  cancelNotification,
  cancelAllNotifications,
  saveScheduledNotifications,
  getScheduledNotifications,
};
