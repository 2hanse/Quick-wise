import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SETTING_CONSTANTS from "../../constants/setting";
import mockSetting from "../../mocks/mockSetting";

const SettingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-6 pb-24">
        <Text className="text-2xl font-bold text-gray-800 mb-8">
          {SETTING_CONSTANTS.TEXT.TITLE}
        </Text>

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
                {mockSetting.name}
              </Text>
            </View>

            <View className="bg-white rounded-xl p-4">
              <Text className="text-xs text-gray-500 mb-1">
                {SETTING_CONSTANTS.TEXT.EMAIL_LABEL}
              </Text>
              <Text className="text-base text-gray-800 font-medium">
                {mockSetting.email}
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-red-500 rounded-xl p-4 items-center">
          <Text className="text-white text-base font-semibold">
            {SETTING_CONSTANTS.TEXT.LOGOUT_BUTTON}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
