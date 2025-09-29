import React from "react";
import { View, Text } from "react-native";
import mainPageConstants from "../../constants/main";
import type { TodaySchedule, ScheduleStatus } from "../../types/main";

interface TodayScheduleSectionProps {
  schedules: TodaySchedule[];
}

const TodayScheduleSection = ({ schedules }: TodayScheduleSectionProps) => {
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
    <View className="bg-white rounded-xl p-5 shadow-sm mb-24">
      <View className="flex-row items-center gap-2 mb-3.5">
        <View className="w-7 h-7 bg-[#dbeafe] rounded-md items-center justify-center">
          <Text className="text-[15px]">{ICONS.SCHEDULE_LIST}</Text>
        </View>
        <Text className="text-[17px] font-bold text-[#1a1a1a]">
          {TEXT.TODAY_SCHEDULE.TITLE}
        </Text>
      </View>

      {schedules.map((schedule, index) => {
        const statusStyle = getStatusStyle(schedule.status);
        return (
          <View
            key={schedule.id}
            className={`flex-row items-center gap-2.5 py-3 ${
              index < schedules.length - 1 ? "border-b border-[#f3f4f6]" : ""
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
  );
};

export default TodayScheduleSection;
