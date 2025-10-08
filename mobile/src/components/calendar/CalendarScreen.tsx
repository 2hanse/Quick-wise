import React, { useState, useMemo, useRef, useEffect } from "react";
import { View, PanResponder, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import CalendarHeader from "./CalendarHeader";
import DayEventsSection from "./DayEventsSection";
import MonthCalendar from "./MonthCalendar";
import EventModal from "./EventModal";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  GESTURE_ACTIVATION_THRESHOLD,
} from "../../constants/gesture";
import {
  CalendarScreenProps,
  CreateEventRequest,
  CalendarEvent,
} from "../../types/calendar";
import useCalendarStore from "../../stores/calendarStore";
import { getMonthRange, getTodayString } from "../../utils/dateUtils";

const CalendarScreen = ({ onNavigateToHome }: CalendarScreenProps) => {
  const { CATEGORY_COLORS } = CALENDAR_CONSTANTS;
  const today = getTodayString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const {
    events,
    isLoading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarStore();

  useEffect(() => {
    const { startDate, endDate } = getMonthRange(currentMonth);
    fetchEvents(startDate, endDate);
  }, [currentMonth, fetchEvents]);

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

    events.forEach((event) => {
      const dateKey = event.startTime.split("T")[0];

      const color = event.category
        ? CATEGORY_COLORS[event.category]
        : "#3b82f6";

      if (marked[dateKey]) {
        marked[dateKey].dots.push({ color });
      } else {
        marked[dateKey] = {
          dots: [{ color }],
        };
      }
    });

    return marked;
  }, [events, CATEGORY_COLORS]);

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

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsAddEventModalVisible(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsAddEventModalVisible(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
    Toast.show({
      type: CALENDAR_CONSTANTS.TOAST.TYPES.SUCCESS,
      text1: CALENDAR_CONSTANTS.MESSAGES.EVENT_DELETED,
      position: CALENDAR_CONSTANTS.TOAST.POSITION.BOTTOM,
      visibilityTime: CALENDAR_CONSTANTS.TOAST.SETTINGS.VISIBILITY_TIME,
      bottomOffset: CALENDAR_CONSTANTS.TOAST.SETTINGS.BOTTOM_OFFSET,
    });
  };

  const handleCloseModal = () => {
    setIsAddEventModalVisible(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (
    eventId: string | null,
    eventData: CreateEventRequest
  ) => {
    if (eventId) {
      await updateEvent(eventId, eventData);
    } else {
      await createEvent(eventData);
    }
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
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator
                size="large"
                color={CALENDAR_CONSTANTS.THEME.COLORS.LOADING_INDICATOR}
              />
              <Text className="mt-4 text-gray-600">
                {CALENDAR_CONSTANTS.MESSAGES.LOADING_EVENTS}
              </Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center">
              <Text
                style={{ color: CALENDAR_CONSTANTS.THEME.COLORS.ERROR_TEXT }}
              >
                {error}
              </Text>
            </View>
          ) : (
            <DayEventsSection
              selectedDate={selectedDate}
              events={events}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          )}
        </View>
      </View>

      <EventModal
        visible={isAddEventModalVisible}
        selectedDate={selectedDate}
        event={selectedEvent}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
      />
      <Toast />
    </SafeAreaView>
  );
};

export default CalendarScreen;
