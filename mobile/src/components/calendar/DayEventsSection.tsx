import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import type { DayEventsSectionProps } from "../../types/calendar";
import EventListItem from "./EventListItem";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const DayEventsSection = ({ selectedDate, events }: DayEventsSectionProps) => {
  const filteredEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const eventDate = event.startTime.split("T")[0];
      return eventDate === selectedDate;
    });

    return filtered.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  }, [selectedDate, events]);

  const formattedDate = useMemo(() => {
    const date = new Date(selectedDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = CALENDAR_CONSTANTS.DAY_NAMES[date.getDay()];
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }, [selectedDate]);

  return (
    <View className="flex-1 bg-white mx-3 mt-3 rounded-2xl border border-gray-200">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-[17px] font-bold text-gray-900">
          {formattedDate}의 일정
        </Text>
      </View>
      {filteredEvents.length === 0 ? (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-[48px] mb-3">📅</Text>
          <Text className="text-[15px] text-gray-500">
            {CALENDAR_CONSTANTS.MESSAGES.EMPTY_EVENTS}
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4">
          {filteredEvents.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default DayEventsSection;
