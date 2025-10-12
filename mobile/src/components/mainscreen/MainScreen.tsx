import React, { useRef } from "react";
import {
  PanResponder,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateHeaderSection from "./DateHeaderSection";
import NextScheduleSection from "./NextScheduleSection";
import ScheduleGuideSection from "./ScheduleGuideSection";
import TodayScheduleSection from "./TodayScheduleSection";
import EmptyScheduleSection from "./EmptyScheduleSection";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  GESTURE_ACTIVATION_THRESHOLD,
} from "../../constants/gesture";
import { MainScreenProps } from "../../types/main";
import useMainSchedule from "../../hooks/mainscreen/useMainSchedule";
import mainPageConstants from "../../constants/main";

const MainScreen = ({ onNavigateToCalendar }: MainScreenProps) => {
  const {
    todaySchedules,
    nextSchedule,
    dateInfo,
    swipeContents,
    isLoading,
    error,
  } = useMainSchedule();
  const hasSchedules = todaySchedules.length > 0;

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

        if (dx < -SWIPE_THRESHOLD || vx < -SWIPE_VELOCITY_THRESHOLD / 1000) {
          onNavigateToCalendar();
        }
      },
    })
  ).current;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600">
            {mainPageConstants.TEXT.LOADING}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-[18px] text-red-500 mb-2">
            {mainPageConstants.ICONS.ERROR}
          </Text>
          <Text className="text-[16px] text-gray-700 text-center">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1" {...panResponder.panHandlers}>
        <ScrollView className="flex-1 px-3 pt-3">
          <DateHeaderSection dateInfo={dateInfo} />

          {hasSchedules ? (
            <>
              {nextSchedule && (
                <NextScheduleSection
                  schedule={nextSchedule}
                  isAILoading={isLoading}
                />
              )}
              {swipeContents.length > 0 && (
                <ScheduleGuideSection swipeContents={swipeContents} />
              )}
              <TodayScheduleSection schedules={todaySchedules} />
            </>
          ) : (
            <EmptyScheduleSection />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
