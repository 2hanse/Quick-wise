import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import mainPageConstants from "../../constants/main";
import { DateHeaderSectionProps } from "../../types/main";

const DateHeaderSection = ({
  dateInfo,
  onRefresh,
  isRefreshing = false,
}: DateHeaderSectionProps) => {
  const { TEXT, ICONS } = mainPageConstants;

  const isToday = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const todayString = `${month}${mainPageConstants.DATE_FORMAT.MONTH_SUFFIX} ${date}${mainPageConstants.DATE_FORMAT.DAY_SUFFIX}`;
    return dateInfo.date === todayString;
  };

  return (
    <View className="bg-white rounded-2xl p-5 mb-2.5 border border-purple-100">
      <View className="flex-row items-center justify-between mb-2.5">
        <View className="flex-row items-center gap-3">
          <View className="w-9 h-9 bg-white rounded-lg items-center justify-center shadow-sm">
            <Text className="text-[20px]">{ICONS.DATE_HEADER}</Text>
          </View>
          <Text className="text-[22px] font-bold text-[#1a1a1a]">
            {dateInfo.date} {dateInfo.dayOfWeek}
          </Text>
        </View>

        {isToday() && onRefresh && (
          <TouchableOpacity
            onPress={onRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-blue-100 rounded-lg"
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color="#3b82f6" />
            ) : (
              <Text className="text-[13px] font-semibold text-blue-600">
                {ICONS.REFRESH} {TEXT.DATE_HEADER.REFRESH_BUTTON}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row items-center gap-1.5">
        <Text className="text-[18px]">{ICONS.WEATHER}</Text>
        <Text className="text-[15px] text-[#6b7280] font-medium">
          {TEXT.DATE_HEADER.SCHEDULE_COUNT(dateInfo.totalSchedules)}
        </Text>
      </View>
    </View>
  );
};

export default DateHeaderSection;
