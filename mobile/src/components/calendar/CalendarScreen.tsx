import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, DateData } from "react-native-calendars";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import mockCalendar from "../../mocks/mockCalendar";

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarScreen = () => {
  const { THEME, CATEGORY_COLORS } = CALENDAR_CONSTANTS;
  const today = getTodayString();
  const [selectedDate, setSelectedDate] = useState(today);

  const markedDates = useMemo(() => {
    const marked: Record<
      string,
      {
        dots?: Array<{ color: string }>;
        selected?: boolean;
        selectedColor?: string;
      }
    > = {};

    mockCalendar.forEach((event) => {
      const dateKey = event.startTime.split("T")[0];
      const color = CATEGORY_COLORS[event.category];

      if (marked[dateKey]) {
        marked[dateKey].dots?.push({ color });
      } else {
        marked[dateKey] = {
          dots: [{ color }],
        };
      }
    });

    if (marked[selectedDate]) {
      marked[selectedDate].selected = true;
      marked[selectedDate].selectedColor = THEME.COLORS.SELECTED_DAY_BG;
    } else {
      marked[selectedDate] = {
        selected: true,
        selectedColor: THEME.COLORS.SELECTED_DAY_BG,
      };
    }

    return marked;
  }, [CATEGORY_COLORS, selectedDate, THEME.COLORS.SELECTED_DAY_BG]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="bg-white rounded-2xl mx-3 mt-3 overflow-hidden border border-gray-200">
          <Calendar
            markingType="multi-dot"
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              backgroundColor: THEME.COLORS.BACKGROUND,
              calendarBackground: THEME.COLORS.BACKGROUND,
              textSectionTitleColor: THEME.COLORS.TEXT_SECONDARY,
              selectedDayBackgroundColor: THEME.COLORS.SELECTED_DAY_BG,
              selectedDayTextColor: THEME.COLORS.SELECTED_DAY_TEXT,
              todayTextColor: THEME.COLORS.TODAY_TEXT,
              todayBackgroundColor: THEME.COLORS.TRANSPARENT,
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
