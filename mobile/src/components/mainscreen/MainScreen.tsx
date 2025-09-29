import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mockCalendar from "../../mocks/mockMain";
import mainPageConstants from "../../constants/main";
import type { ScheduleStatus } from "../../types/main";

const MainScreen = () => {
  const { TEXT, ICONS, STATUS_ICONS } = mainPageConstants;
  const getStatusStyle = (status: ScheduleStatus) => {
    const styles = {
      completed: {
        bg: "bg-[#d1fae5]",
        text: "text-[#059669]",
        icon: STATUS_ICONS.COMPLETED,
      },
      progress: {
        bg: "bg-[#fef3c7]",
        text: "text-[#d97706]",
        icon: STATUS_ICONS.PROGRESS,
      },
      upcoming: {
        bg: "bg-[#e0e7ff]",
        text: "text-[#6366f1]",
        icon: STATUS_ICONS.UPCOMING,
      },
    };
    return styles[status];
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-3 pt-3">
        <View className="bg-white rounded-2xl p-5 mb-2.5 border border-purple-100">
          <View className="flex-row items-center gap-3 mb-2.5">
            <View className="w-9 h-9 bg-white rounded-lg items-center justify-center shadow-sm">
              <Text className="text-[20px]">{ICONS.DATE_HEADER}</Text>
            </View>
            <Text className="text-[22px] font-bold text-[#1a1a1a]">
              {mockCalendar.dateInfo.date} {mockCalendar.dateInfo.dayOfWeek}
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[18px]">{ICONS.WEATHER}</Text>
            <Text className="text-[15px] text-[#6b7280] font-medium">
              {TEXT.DATE_HEADER.SCHEDULE_COUNT(
                mockCalendar.dateInfo.totalSchedules,
                mockCalendar.dateInfo.studySchedules
              )}
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-2.5 border-l-4 border-[#667eea] shadow-sm">
          <View className="flex-row items-center gap-2 mb-3.5">
            <View className="w-7 h-7 bg-[#fef3c7] rounded-md items-center justify-center">
              <Text className="text-[15px]">{ICONS.TARGET}</Text>
            </View>
            <Text className="text-[17px] font-bold text-[#1a1a1a]">
              {TEXT.NEXT_SCHEDULE.TITLE}
            </Text>
          </View>

          <Text className="text-[18px] font-semibold text-[#1a1a1a] mb-2">
            • [ {mockCalendar.nextSchedule.startTime} ]{" "}
            {mockCalendar.nextSchedule.title}
          </Text>

          <View className="flex-row items-center gap-1.5 mb-3.5">
            <Text className="text-[15px] text-[#ef4444]">{ICONS.LOCATION}</Text>
            <Text className="text-[15px] text-[#6b7280] font-medium">
              {mockCalendar.nextSchedule.location}
            </Text>
          </View>

          <View className="bg-white rounded-md p-3.5 flex-row items-center justify-between border border-blue-100">
            <View className="flex-row items-center gap-2 flex-1">
              <View className="w-8 h-8 bg-[#ef4444] rounded-md items-center justify-center">
                <Text className="text-white text-[13px] font-bold">
                  {ICONS.PLAY}
                </Text>
              </View>
              <Text
                className="text-[14px] text-[#0369a1] font-semibold"
                numberOfLines={1}
              >
                {mockCalendar.nextSchedule.lecture.title}
              </Text>
            </View>
            <View className="bg-[#60a5fa] px-4 py-2 rounded-md shadow-sm">
              <Text className="text-[14px] text-white font-bold">
                {TEXT.NEXT_SCHEDULE.PLAY_BUTTON}
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-2.5 min-h-[220px] border border-amber-200">
          <View>
            <Text className="text-[17px] font-bold text-[#1a1a1a] mb-3.5">
              {TEXT.SWIPE_CONTENT.EFFECTS_TITLE}
            </Text>
            {mockCalendar.swipeContents[0].effects?.map((effect) => (
              <View
                key={effect.id}
                className="flex-row items-start gap-2 mb-2.5"
              >
                <Text className="text-[#667eea] font-bold mt-0.5 text-[15px]">
                  •
                </Text>
                <Text className="text-[15px] leading-6 flex-1">
                  {effect.highlight ? (
                    <>
                      <Text className="text-[#667eea] font-semibold">
                        {effect.highlight}
                      </Text>
                      {effect.description && (
                        <>
                          <Text className="text-[#9ca3af]"> → </Text>
                          <Text className="text-[#4b5563] font-medium">
                            {effect.description}
                          </Text>
                        </>
                      )}
                    </>
                  ) : (
                    <Text className="text-[#4b5563] font-medium">
                      {effect.description}
                    </Text>
                  )}
                </Text>
              </View>
            ))}
          </View>

          <View className="flex-row justify-center gap-1.5 mt-4">
            {mockCalendar.swipeContents.map((content, index) => (
              <View
                key={content.id}
                className={`h-1.5 rounded-full ${
                  index === 0 ? "w-5 bg-[#667eea]" : "w-1.5 bg-[#e5e7eb]"
                }`}
              />
            ))}
          </View>
        </View>

        <View className="bg-white rounded-xl p-5 shadow-sm mb-24">
          <View className="flex-row items-center gap-2 mb-3.5">
            <View className="w-7 h-7 bg-[#dbeafe] rounded-md items-center justify-center">
              <Text className="text-[15px]">{ICONS.SCHEDULE_LIST}</Text>
            </View>
            <Text className="text-[17px] font-bold text-[#1a1a1a]">
              {TEXT.TODAY_SCHEDULE.TITLE}
            </Text>
          </View>

          {mockCalendar.todaySchedules.map((schedule, index) => {
            const statusStyle = getStatusStyle(schedule.status);
            return (
              <View
                key={schedule.id}
                className={`flex-row items-center gap-2.5 py-3 ${
                  index < mockCalendar.todaySchedules.length - 1
                    ? "border-b border-[#f3f4f6]"
                    : ""
                }`}
              >
                <View
                  className={`w-5 h-5 rounded-full items-center justify-center ${statusStyle.bg}`}
                >
                  <Text className={`text-[12px] ${statusStyle.text}`}>
                    {statusStyle.icon}
                  </Text>
                </View>
                <Text className="text-[15px] font-semibold text-[#1a1a1a]">
                  {schedule.time} :
                </Text>
                <Text className="text-[15px] text-[#4b5563] font-medium">
                  {schedule.title}
                </Text>
                <View className="ml-auto bg-[#f3f4f6] px-2.5 py-1 rounded-md">
                  <Text className="text-[12px] text-[#6b7280] font-semibold">
                    {schedule.badge}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
