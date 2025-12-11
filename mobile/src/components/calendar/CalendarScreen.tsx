import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import CalendarHeader from "./CalendarHeader";
import DayEventsSection from "./DayEventsSection";
import MonthCalendar from "./MonthCalendar";
import EventModal from "./EventModal";
import { CalendarScreenProps } from "../../types/calendar";
import { getTodayString } from "../../utils/dateUtils";
import useCalendarData from "../../hooks/calendar/useCalendarData";
import useCalendarGesture from "../../hooks/calendar/useCalendarGesture";
import useEventModal from "../../hooks/calendar/useEventModal";
import useRefreshControl from "../../hooks/useRefreshControl";

const CalendarScreen = ({ onNavigateToHome }: CalendarScreenProps) => {
  const today = getTodayString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { events, isLoading, error, markedDates, refresh } =
    useCalendarData(currentMonth);
  const refreshControlProps = useRefreshControl({
    onRefresh: refresh,
    isRefreshing: isLoading,
  });
  const panResponder = useCalendarGesture(onNavigateToHome);
  const {
    isAddEventModalVisible,
    selectedEvent,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleCloseModal,
    handleSaveEvent,
  } = useEventModal();

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
        <ScrollView
          className="flex-1"
          refreshControl={<RefreshControl {...refreshControlProps} />}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="bg-white rounded-2xl mx-3 overflow-hidden border border-gray-200">
            <MonthCalendar
              currentMonth={currentMonth}
              onDayPress={handleDayPress}
              markedDates={markedDates}
              selectedDate={selectedDate}
            />
          </View>
          {isLoading ? (
            <View className="flex-1 items-center justify-center py-10">
              <ActivityIndicator
                size="large"
                color={CALENDAR_CONSTANTS.THEME.COLORS.LOADING_INDICATOR}
              />
              <Text className="mt-4 text-gray-600">
                {CALENDAR_CONSTANTS.MESSAGES.LOADING_EVENTS}
              </Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center py-10">
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
        </ScrollView>
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
