import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SETTING_CONSTANTS from "../../constants/setting";
import NOTIFICATION_CONSTANTS from "../../constants/notification";
import { STORAGE_KEYS } from "../../constants/storage";
import useAuthStore from "../../stores/authStore";
import { requestNotificationPermission } from "../../services/notificationService";

const SettingScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadNotificationSetting();
  }, []);

  const loadNotificationSetting = async () => {
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED
    );
    setNotificationsEnabled(stored === "true");
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      const permission = await requestNotificationPermission();
      if (!permission.granted) {
        setNotificationsEnabled(false);
        return;
      }
    }

    setNotificationsEnabled(value);
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED,
      value.toString()
    );
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-6 pb-24">
        <Text className="text-2xl font-bold text-gray-800 mb-8">
          {SETTING_CONSTANTS.TEXT.TITLE}
        </Text>

        <View className="bg-gray-50 rounded-2xl p-6 mb-6">
          <Text className="text-sm text-gray-600 mb-4 font-semibold">
            {NOTIFICATION_CONSTANTS.SETTING.TITLE}
          </Text>

          <View className="flex-row items-center justify-between bg-white rounded-xl p-4">
            <View className="flex-1">
              <Text className="text-base text-gray-800 font-medium mb-1">
                {NOTIFICATION_CONSTANTS.SETTING.DESCRIPTION}
              </Text>
              <Text className="text-xs text-gray-500">
                {NOTIFICATION_CONSTANTS.ADVANCE_MINUTES}분 전 알림
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
            />
          </View>
        </View>

        <View className="bg-gray-50 rounded-2xl p-6 mb-6">
          <Text className="text-sm text-gray-600 mb-4 font-semibold">
            {SETTING_CONSTANTS.TEXT.PROFILE_SECTION}
          </Text>

          <View className="space-y-3">
            <View className="bg-white rounded-xl p-4">
              <Text className="text-xs text-gray-500 mb-1">
                {SETTING_CONSTANTS.TEXT.NAME_LABEL}
              </Text>
              <Text className="text-base text-gray-800 font-medium">
                {user?.name}
              </Text>
            </View>

            <View className="bg-white rounded-xl p-4">
              <Text className="text-xs text-gray-500 mb-1">
                {SETTING_CONSTANTS.TEXT.EMAIL_LABEL}
              </Text>
              <Text className="text-base text-gray-800 font-medium">
                {user?.email}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-xl p-4 items-center"
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text className="text-white text-base font-semibold">
            {SETTING_CONSTANTS.TEXT.LOGOUT_BUTTON}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
