import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { CalendarHeaderProps } from "../../types/calendar";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const CalendarHeader = ({ currentMonth, onToday }: CalendarHeaderProps) => {
  const { MONTH_NAMES, DAY_NAMES, MESSAGES } = CALENDAR_CONSTANTS;
  const month = MONTH_NAMES[currentMonth.getMonth()];
  const day = currentMonth.getDate();
  const dayOfWeek = DAY_NAMES[currentMonth.getDay()];

  return (
    <View className="bg-white rounded-2xl p-5 mx-3 mt-3 mb-2.5 border border-purple-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-9 h-9 bg-white rounded-lg items-center justify-center shadow-sm">
            <Text className="text-[20px]">📅</Text>
          </View>
          <Text className="text-[22px] font-bold text-gray-900">
            {month} {day}일 ({dayOfWeek})
          </Text>
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
