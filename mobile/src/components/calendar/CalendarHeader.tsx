import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { CalendarHeaderProps } from "../../types/calendar";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const CalendarHeader = ({
  currentMonth,
  onToday,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => {
  const { MONTH_NAMES, MESSAGES } = CALENDAR_CONSTANTS;

  const currentYear = currentMonth.getFullYear();
  const currentMonthName = MONTH_NAMES[currentMonth.getMonth()];

  return (
    <View className="bg-white rounded-2xl p-5 mx-3 mt-3 mb-2.5 border border-purple-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={onPrevMonth}
            className="w-9 h-9 bg-white rounded-lg items-center justify-center shadow-sm"
            activeOpacity={0.7}
          >
            <Text className="text-[20px] text-gray-600">
              {CALENDAR_CONSTANTS.NAVIGATION_ICONS.PREV}
            </Text>
          </TouchableOpacity>

          <Text className="text-[22px] font-bold text-gray-900">
            {currentYear}년 {currentMonthName}
          </Text>

          <TouchableOpacity
            onPress={onNextMonth}
            className="w-8 h-8 items-center justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-[20px] text-gray-600">
              {CALENDAR_CONSTANTS.NAVIGATION_ICONS.NEXT}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onToday}
          className="px-3 py-1.5 bg-purple-100 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-[13px] font-semibold text-purple-700">
            {MESSAGES.TODAY_BUTTON}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalendarHeader;
