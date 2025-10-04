import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMonthDates } from "../../utils/dateUtils";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import DATE_UTILS_CONSTANTS from "../../constants/dateUtils";
import { MonthCalendarProps } from "../../types/calendar";

const MonthCalendar = ({ currentMonth, onDayPress }: MonthCalendarProps) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const dates = getMonthDates(year, month);

  const renderDayHeader = () => {
    return (
      <View className="flex-row border-b border-gray-200 pb-2">
        {CALENDAR_CONSTANTS.DAY_NAMES.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-[13px] font-semibold text-gray-600">
              {day}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderWeeks = () => {
    const weeks = [];
    for (
      let weekStartIndex = 0;
      weekStartIndex < dates.length;
      weekStartIndex += DATE_UTILS_CONSTANTS.DAYS_IN_WEEK
    ) {
      const weekDates = dates.slice(
        weekStartIndex,
        weekStartIndex + DATE_UTILS_CONSTANTS.DAYS_IN_WEEK
      );
      const weekKey = `week-${weekDates[0].dateString}`;

      weeks.push(
        <View key={weekKey} className="flex-row">
          {weekDates.map((dateCell) => (
            <TouchableOpacity
              key={dateCell.dateString}
              className="flex-1 items-center py-2"
              onPress={() => onDayPress(dateCell.dateString)}
              activeOpacity={0.7}
            >
              <Text
                className={`text-[15px] ${
                  dateCell.isCurrentMonth ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {dateCell.date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return weeks;
  };

  return (
    <View className="bg-white p-3">
      {renderDayHeader()}
      <View className="mt-2">{renderWeeks()}</View>
    </View>
  );
};

export default MonthCalendar;
