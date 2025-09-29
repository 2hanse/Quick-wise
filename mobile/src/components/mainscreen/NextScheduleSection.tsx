import React from "react";
import { View, Text } from "react-native";
import mainPageConstants from "../../constants/main";
import type { NextSchedule } from "../../types/main";

interface NextScheduleSectionProps {
  schedule: NextSchedule;
}

const NextScheduleSection = ({ schedule }: NextScheduleSectionProps) => {
  const { TEXT, ICONS } = mainPageConstants;

  return (
    <View className="bg-white rounded-2xl p-5 mb-2.5 border-l-4 border-[#667eea] shadow-sm">
      <View className="flex-row items-center gap-2 mb-3.5">
        <View className="w-7 h-7 bg-[#fef3c7] rounded-md items-center justify-center">
          <Text className="text-[15px]">{ICONS.TARGET}</Text>
        </View>
        <Text className="text-[17px] font-bold text-[#1a1a1a]">
          {TEXT.NEXT_SCHEDULE.TITLE}
        </Text>
      </View>

      <Text className="text-[18px] font-semibold text-[#1a1a1a] mb-2">
        • [ {schedule.startTime} ] {schedule.title}
      </Text>

      <View className="flex-row items-center gap-1.5 mb-3.5">
        <Text className="text-[15px] text-[#ef4444]">{ICONS.LOCATION}</Text>
        <Text className="text-[15px] text-[#6b7280] font-medium">
          {schedule.location}
        </Text>
      </View>

      <View className="bg-white rounded-md p-3.5 flex-row items-center justify-between border border-blue-100">
        <View className="flex-row items-center gap-2 flex-1">
          <View className="w-8 h-8 bg-[#ef4444] rounded-md items-center justify-center">
            <Text className="text-white text-[13px] font-bold">
              {ICONS.PLAY}
            </Text>
          </View>
          <Text
            className="text-[14px] text-[#0369a1] font-semibold"
            numberOfLines={1}
          >
            {schedule.lecture.title}
          </Text>
        </View>
        <View className="bg-[#60a5fa] px-4 py-2 rounded-md shadow-sm">
          <Text className="text-[14px] text-white font-bold">
            {TEXT.NEXT_SCHEDULE.PLAY_BUTTON}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NextScheduleSection;
