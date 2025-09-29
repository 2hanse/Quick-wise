import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mockCalendar from "../../mocks/mockMain";
import DateHeaderSection from "./DateHeaderSection";
import NextScheduleSection from "./NextScheduleSection";
import ScheduleGuideSection from "./ScheduleGuideSection";
import TodayScheduleSection from "./TodayScheduleSection";
import EmptyScheduleSection from "./EmptyScheduleSection";

const MainScreen = () => {
  const hasSchedules =
    mockCalendar.todaySchedules && mockCalendar.todaySchedules.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-3 pt-3">
        <DateHeaderSection dateInfo={mockCalendar.dateInfo} />

        {hasSchedules ? (
          <>
            <NextScheduleSection schedule={mockCalendar.nextSchedule} />
            <ScheduleGuideSection swipeContents={mockCalendar.swipeContents} />
            <TodayScheduleSection schedules={mockCalendar.todaySchedules} />
          </>
        ) : (
          <EmptyScheduleSection />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
