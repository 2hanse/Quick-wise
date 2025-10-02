import React, { useRef } from "react";
import { PanResponder, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mockCalendar from "../../mocks/mockMain";
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

const MainScreen = ({ onNavigateToCalendar }: MainScreenProps) => {
  const hasSchedules =
    mockCalendar.todaySchedules && mockCalendar.todaySchedules.length > 0;

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1" {...panResponder.panHandlers}>
        <ScrollView className="flex-1 px-3 pt-3">
          <DateHeaderSection dateInfo={mockCalendar.dateInfo} />

          {hasSchedules ? (
            <>
              <NextScheduleSection schedule={mockCalendar.nextSchedule} />
              <ScheduleGuideSection
                swipeContents={mockCalendar.swipeContents}
              />
              <TodayScheduleSection schedules={mockCalendar.todaySchedules} />
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
