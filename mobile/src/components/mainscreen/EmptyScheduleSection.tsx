import React from "react";
import { View, Text, Image } from "react-native";
import mainPageConstants from "../../constants/main";

const EmptyScheduleSection = () => {
  const { TEXT, ICONS } = mainPageConstants;

  return (
    <View className="flex-1 py-10 px-4">
      <View className="absolute top-10 left-8 w-20 h-20 bg-blue-100 rounded-full opacity-30" />
      <View className="absolute top-32 right-12 w-16 h-16 bg-purple-100 rounded-full opacity-30" />
      <View className="absolute bottom-20 left-16 w-24 h-24 bg-pink-100 rounded-full opacity-30" />

      <View className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
        <View className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />

        <View className="items-center mb-6">
          <Image
            source={require("../../../assets/empty-schedule.png")}
            className="w-72 h-72"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            {TEXT.EMPTY_SCHEDULE.TITLE}
          </Text>
          <Text className="text-sm text-gray-500 text-center leading-relaxed px-4">
            {TEXT.EMPTY_SCHEDULE.SUBTITLE}
          </Text>
        </View>

        <View className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5">
          <Text className="text-xs font-semibold text-gray-600 mb-3 text-center">
            {TEXT.EMPTY_SCHEDULE.SUGGESTION_TITLE}
          </Text>

          <View className="flex-row justify-around">
            <View className="items-center">
              <View className="bg-white rounded-full w-12 h-12 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">{ICONS.EMPTY_SCHEDULE.READING}</Text>
              </View>
              <Text className="text-xs text-gray-600">
                {TEXT.EMPTY_SCHEDULE.ACTIVITIES.READING}
              </Text>
            </View>

            <View className="items-center">
              <View className="bg-white rounded-full w-12 h-12 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">{ICONS.EMPTY_SCHEDULE.MUSIC}</Text>
              </View>
              <Text className="text-xs text-gray-600">
                {TEXT.EMPTY_SCHEDULE.ACTIVITIES.MUSIC}
              </Text>
            </View>

            <View className="items-center">
              <View className="bg-white rounded-full w-12 h-12 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">{ICONS.EMPTY_SCHEDULE.WALKING}</Text>
              </View>
              <Text className="text-xs text-gray-600">
                {TEXT.EMPTY_SCHEDULE.ACTIVITIES.WALKING}
              </Text>
            </View>

            <View className="items-center">
              <View className="bg-white rounded-full w-12 h-12 items-center justify-center mb-2 shadow-sm">
                <Text className="text-xl">{ICONS.EMPTY_SCHEDULE.REST}</Text>
              </View>
              <Text className="text-xs text-gray-600">
                {TEXT.EMPTY_SCHEDULE.ACTIVITIES.REST}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmptyScheduleSection;
