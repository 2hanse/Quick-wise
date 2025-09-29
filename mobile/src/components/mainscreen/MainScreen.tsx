import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mockCalendar from "../../mocks/mockMain";
import DateHeaderSection from "./DateHeaderSection";
import NextScheduleSection from "./NextScheduleSection";
import ScheduleGuideSection from "./ScheduleGuideSection";
import TodayScheduleSection from "./TodayScheduleSection";

const MainScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-3 pt-3">
        <DateHeaderSection dateInfo={mockCalendar.dateInfo} />
        <NextScheduleSection schedule={mockCalendar.nextSchedule} />
        <ScheduleGuideSection swipeContents={mockCalendar.swipeContents} />
        <TodayScheduleSection schedules={mockCalendar.todaySchedules} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
