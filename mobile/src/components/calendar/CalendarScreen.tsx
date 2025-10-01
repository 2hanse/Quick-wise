import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const CalendarScreen = () => {
  const { THEME } = CALENDAR_CONSTANTS;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="bg-white rounded-2xl mx-3 mt-3 overflow-hidden border border-gray-200">
          <Calendar
            theme={{
              backgroundColor: THEME.COLORS.BACKGROUND,
              calendarBackground: THEME.COLORS.BACKGROUND,
              textSectionTitleColor: THEME.COLORS.TEXT_SECONDARY,
              selectedDayBackgroundColor: THEME.COLORS.SELECTED_DAY_BG,
              selectedDayTextColor: THEME.COLORS.SELECTED_DAY_TEXT,
              todayTextColor: THEME.COLORS.TODAY_TEXT,
              dayTextColor: THEME.COLORS.TEXT_PRIMARY,
              textDisabledColor: THEME.COLORS.TEXT_DISABLED,
              monthTextColor: THEME.COLORS.TEXT_PRIMARY,
              textMonthFontSize: THEME.FONT_SIZES.MONTH,
              textMonthFontWeight: THEME.FONT_WEIGHTS.MONTH,
              textDayFontSize: THEME.FONT_SIZES.DAY,
              textDayHeaderFontSize: THEME.FONT_SIZES.DAY_HEADER,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
