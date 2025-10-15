import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import NOTIFICATION_CONSTANTS from "../constants/notification";
import { NotificationPermissionStatus } from "../types/notification";

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

export {
  requestNotificationPermission,
  createNotificationChannel,
  getNotificationPermissionStatus,
};
