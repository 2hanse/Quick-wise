import React from "react";
import { View, Text } from "react-native";
import type { EventListItemProps } from "../../types/calendar";

const EventListItem = ({ event }: EventListItemProps) => {
  const startTime = new Date(event.startTime).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const endTime = new Date(event.endTime).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <View className="py-3 border-b border-gray-100">
      <View className="flex-row items-center gap-2 mb-1">
        <Text className="text-[15px] font-semibold text-gray-900">
          {startTime} - {endTime}
        </Text>
      </View>
      <Text className="text-[15px] text-gray-700 mb-1">{event.title}</Text>
      {event.location && (
        <Text className="text-[13px] text-gray-500">{event.location}</Text>
      )}
    </View>
  );
};

export default EventListItem;
