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
import SwipeContentSkeleton from "./SwipeContentSkeleton";
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

  const renderAIContent = () => {
    if (!nextSchedule?.aiContent) {
      return null;
    }

    const { status } = nextSchedule.aiContent;
    const { AI_STATUS, TEXT, ICONS } = mainPageConstants;

    if (status === AI_STATUS.PROCESSING) {
      return (
        <View>
          <View className="flex-row items-center gap-2 mx-3 mb-2">
            <Text className="text-[14px] text-gray-600 font-medium">
              {TEXT.NEXT_SCHEDULE.AI_PROCESSING}
            </Text>
          </View>
          <SwipeContentSkeleton />
        </View>
      );
    }

    if (status === AI_STATUS.COMPLETED && swipeContents.length > 0) {
      return <ScheduleGuideSection swipeContents={swipeContents} />;
    }

    if (status === AI_STATUS.FAILED) {
      return (
        <View className="mx-3 mb-2.5">
          <View className="bg-red-50 rounded-xl p-4 border border-red-200">
            <Text className="text-[14px] text-red-600 font-medium">
              {ICONS.ERROR} {TEXT.NEXT_SCHEDULE.AI_FAILED}
            </Text>
            {nextSchedule.aiContent.error && (
              <Text className="text-[12px] text-red-500 mt-1">
                {nextSchedule.aiContent.error}
              </Text>
            )}
          </View>
        </View>
      );
    }

    return null;
  };

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
              {renderAIContent()}
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
