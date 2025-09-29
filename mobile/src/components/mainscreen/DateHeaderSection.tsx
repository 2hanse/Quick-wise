import React from "react";
import { View, Text } from "react-native";
import mainPageConstants from "../../constants/main";
import type { DateInfo } from "../../types/main";

interface DateHeaderSectionProps {
  dateInfo: DateInfo;
}

const DateHeaderSection = ({ dateInfo }: DateHeaderSectionProps) => {
  const { TEXT, ICONS } = mainPageConstants;

  return (
    <View className="bg-white rounded-2xl p-5 mb-2.5 border border-purple-100">
      <View className="flex-row items-center gap-3 mb-2.5">
        <View className="w-9 h-9 bg-white rounded-lg items-center justify-center shadow-sm">
          <Text className="text-[20px]">{ICONS.DATE_HEADER}</Text>
        </View>
        <Text className="text-[22px] font-bold text-[#1a1a1a]">
          {dateInfo.date} {dateInfo.dayOfWeek}
        </Text>
      </View>
      <View className="flex-row items-center gap-1.5">
        <Text className="text-[18px]">{ICONS.WEATHER}</Text>
        <Text className="text-[15px] text-[#6b7280] font-medium">
          {TEXT.DATE_HEADER.SCHEDULE_COUNT(
            dateInfo.totalSchedules,
            dateInfo.studySchedules
          )}
        </Text>
      </View>
    </View>
  );
};

export default DateHeaderSection;
