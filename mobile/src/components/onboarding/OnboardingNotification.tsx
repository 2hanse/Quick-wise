import React from "react";
import { View, Text } from "react-native";
import {
  HEADER_TITLE,
  HEADER_SUBTEXT,
  REASON_NOTIFICATION,
  NOTIFICATION_SECTION,
  SETTING_NOTIFICATION,
} from "../../constants/onboarding";

const OnboardingNotification = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-white justify-center items-center px-8 py-12 flex-col">
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-blue-600 text-center leading-tight mb-4">
            {HEADER_TITLE.onboarding4}
            <Text className="text-gray-800 font-extrabold">
              {HEADER_TITLE.onboarding4_1}
            </Text>
          </Text>
          <View className="w-16 h-0.5 bg-gray-400 mx-auto mb-4"></View>
          <Text className="text-base text-gray-600 text-center leading-relaxed max-w-xs">
            {HEADER_SUBTEXT.onboarding4}
          </Text>
        </View>

        <View className="w-full mb-12">
          <View className="flex-row items-center justify-center mb-5">
            <View className="w-7 h-7 bg-gray-100 rounded-lg items-center justify-center mr-2">
              <Text className="text-sm">💡</Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">
              {REASON_NOTIFICATION}
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row mb-4 bg-slate-50 p-4 rounded-xl border-l-4 border-sky-500 shadow-sm">
              <View className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-base">⏰</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-900 mb-1">
                  {NOTIFICATION_SECTION.title1}
                </Text>
                <Text className="text-xs text-gray-600 leading-relaxed">
                  {NOTIFICATION_SECTION.text1}
                </Text>
              </View>
            </View>

            <View className="flex-row mb-4 bg-slate-50 p-4 rounded-xl border-l-4 border-sky-500 shadow-sm">
              <View className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-base">📊</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-900 mb-1">
                  {NOTIFICATION_SECTION.title2}
                </Text>
                <Text className="text-xs text-gray-600 leading-relaxed">
                  {NOTIFICATION_SECTION.text2}
                </Text>
              </View>
            </View>

            <View className="flex-row mb-4 bg-slate-50 p-4 rounded-xl border-l-4 border-sky-500 shadow-sm">
              <View className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-base">🎯</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-900 mb-1">
                  {NOTIFICATION_SECTION.title3}
                </Text>
                <Text className="text-xs text-gray-600 leading-relaxed">
                  {NOTIFICATION_SECTION.text3}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full mb-8 bg-white border border-gray-300 h-14 rounded-lg flex-row items-center justify-center shadow-sm">
          <Text className="mr-3">⚙️</Text>
          <Text className="text-black text-lg font-bold">
            {SETTING_NOTIFICATION}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default OnboardingNotification;
