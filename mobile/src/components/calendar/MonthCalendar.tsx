import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMonthDates } from "../../utils/dateUtils";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import DATE_UTILS_CONSTANTS from "../../constants/dateUtils";
import { MonthCalendarProps } from "../../types/calendar";

const MonthCalendar = ({
  currentMonth,
  onDayPress,
  markedDates = {},
  selectedDate,
}: MonthCalendarProps) => {
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

  const renderDots = (dateString: string) => {
    const marked = markedDates[dateString];
    if (!marked?.dots || marked.dots.length === 0) return null;

    return (
      <View className="flex-row gap-1 mt-1">
        {marked.dots.map((dot, dotIndex) => (
          <View
            key={`${dateString}-${dot.color}-${dotIndex}`}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: dot.color }}
          />
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
          {weekDates.map((dateCell) => {
            const isSelected = dateCell.dateString === selectedDate;
            const isToday = dateCell.isToday;

            let backgroundColor: string =
              CALENDAR_CONSTANTS.THEME.COLORS.TRANSPARENT;
            let textColor: string;

            if (isToday) {
              backgroundColor = CALENDAR_CONSTANTS.THEME.COLORS.TODAY_HIGHLIGHT;
              textColor = CALENDAR_CONSTANTS.THEME.COLORS.TODAY_TEXT;
            } else if (isSelected) {
              backgroundColor = CALENDAR_CONSTANTS.THEME.COLORS.SELECTED_DAY_BG;
              textColor = CALENDAR_CONSTANTS.THEME.COLORS.SELECTED_DAY_TEXT;
            } else {
              textColor = dateCell.isCurrentMonth
                ? CALENDAR_CONSTANTS.THEME.COLORS.TEXT_PRIMARY
                : CALENDAR_CONSTANTS.THEME.COLORS.TEXT_DISABLED;
            }

            return (
              <View
                key={dateCell.dateString}
                className="flex-1 items-center py-2"
              >
                <TouchableOpacity
                  onPress={() => onDayPress(dateCell.dateString)}
                  activeOpacity={0.7}
                >
                  <View
                    className="items-center justify-center"
                    style={{
                      width: CALENDAR_CONSTANTS.THEME.LAYOUT.DAY_CIRCLE_SIZE,
                      height: CALENDAR_CONSTANTS.THEME.LAYOUT.DAY_CIRCLE_SIZE,
                      borderRadius:
                        CALENDAR_CONSTANTS.THEME.LAYOUT.DAY_CIRCLE_SIZE / 2,
                      backgroundColor: backgroundColor,
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: CALENDAR_CONSTANTS.THEME.FONT_SIZES.DAY,
                        fontWeight: isSelected || isToday ? "600" : "normal",
                        color: textColor,
                      }}
                    >
                      {dateCell.date.getDate()}
                    </Text>
                  </View>
                  {renderDots(dateCell.dateString)}
                </TouchableOpacity>
              </View>
            );
          })}
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
