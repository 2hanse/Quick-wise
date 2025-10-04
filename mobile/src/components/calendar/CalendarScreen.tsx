import React, { useState, useMemo, useRef } from "react";
import { View, PanResponder } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import mockCalendar from "../../mocks/mockCalendar";
import CalendarHeader from "./CalendarHeader";
import DayEventsSection from "./DayEventsSection";
import MonthCalendar from "./MonthCalendar";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  GESTURE_ACTIVATION_THRESHOLD,
} from "../../constants/gesture";
import { CalendarScreenProps } from "../../types/calendar";

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarScreen = ({ onNavigateToHome }: CalendarScreenProps) => {
  const { CATEGORY_COLORS } = CALENDAR_CONSTANTS;
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
    const marked: Record<string, { dots: Array<{ color: string }> }> = {};

    mockCalendar.forEach((event) => {
      const dateKey = event.startTime.split("T")[0];
      const color = CATEGORY_COLORS[event.category];

      if (marked[dateKey]) {
        marked[dateKey].dots.push({ color });
      } else {
        marked[dateKey] = {
          dots: [{ color }],
        };
      }
    });

    return marked;
  }, [CATEGORY_COLORS]);

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleDayPress = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleToday = () => {
    const todayDate = new Date();
    setCurrentMonth(todayDate);
    setSelectedDate(getTodayString());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1" {...panResponder.panHandlers}>
        <CalendarHeader
          currentMonth={currentMonth}
          onToday={handleToday}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <View className="flex-1">
          <View className="bg-white rounded-2xl mx-3 overflow-hidden border border-gray-200">
            <MonthCalendar
              currentMonth={currentMonth}
              onDayPress={handleDayPress}
              markedDates={markedDates}
              selectedDate={selectedDate}
            />
          </View>
          <DayEventsSection selectedDate={selectedDate} events={mockCalendar} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
