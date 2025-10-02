import React, { useState, useMemo, useRef } from "react";
import { PanResponder, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, DateData } from "react-native-calendars";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import mockCalendar from "../../mocks/mockCalendar";
import CalendarHeader from "./CalendarHeader";
import DayEventsSection from "./DayEventsSection";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  GESTURE_ACTIVATION_THRESHOLD,
} from "../../constants/gesture";
import type { CalendarScreenProps } from "../../types/calendar";

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarScreen = ({ onNavigateToHome }: CalendarScreenProps) => {
  const { THEME, CATEGORY_COLORS } = CALENDAR_CONSTANTS;
  const today = getTodayString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return (
          Math.abs(dx) > Math.abs(dy) &&
          Math.abs(dx) > GESTURE_ACTIVATION_THRESHOLD
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;

        if (dx > SWIPE_THRESHOLD || vx > SWIPE_VELOCITY_THRESHOLD / 1000) {
          onNavigateToHome();
        }
      },
    })
  ).current;

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

  const handleToday = () => {
    const todayDate = new Date();
    setCurrentMonth(todayDate);
    setSelectedDate(getTodayString());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1" {...panResponder.panHandlers}>
        <CalendarHeader currentMonth={currentMonth} onToday={handleToday} />
        <View className="flex-1">
          <View className="bg-white rounded-2xl mx-3 mt-3 overflow-hidden border border-gray-200">
            <Calendar
              key={currentMonth.toISOString()}
              current={currentMonth.toISOString().split("T")[0]}
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
          <DayEventsSection selectedDate={selectedDate} events={mockCalendar} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
