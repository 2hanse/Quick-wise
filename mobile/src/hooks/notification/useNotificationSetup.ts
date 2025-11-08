import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getNotificationPermissionStatus,
  createNotificationChannel,
} from "../../services/notificationService";
import { STORAGE_KEYS } from "../../constants/storage";

const useNotificationSetup = () => {
  useEffect(() => {
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    const permissionStatus = await getNotificationPermissionStatus();

    if (!permissionStatus.granted) {
      return;
    }

    await createNotificationChannel();
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, "true");
  };
};

export default useNotificationSetup;
