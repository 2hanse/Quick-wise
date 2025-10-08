import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { EventListItemProps } from "../../types/calendar";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const EventListItem = ({ event, onPress }: EventListItemProps) => {
  const { CATEGORY_COLORS, CATEGORY_LABELS } = CALENDAR_CONSTANTS;

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

  const categoryColor = event.category
    ? CATEGORY_COLORS[event.category]
    : CATEGORY_COLORS.DEFAULT;

  const categoryLabel = event.category
    ? CATEGORY_LABELS[event.category]
    : CATEGORY_LABELS.DEFAULT;

  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      activeOpacity={0.7}
      className="py-3 border-b border-gray-100"
    >
      <View className="flex-row items-center gap-2 mb-1">
        <View
          className="px-2.5 py-1 rounded-md"
          style={{ backgroundColor: `${categoryColor}15` }}
        >
          <Text
            className="text-[12px] font-semibold"
            style={{ color: categoryColor }}
          >
            {categoryLabel}
          </Text>
        </View>
        <Text className="text-[15px] font-semibold text-gray-900">
          {startTime} - {endTime}
        </Text>
      </View>
      <Text className="text-[15px] text-gray-700 mb-1">{event.title}</Text>
      {event.location && (
        <Text className="text-[13px] text-gray-500">{event.location}</Text>
      )}
    </TouchableOpacity>
  );
};

export default EventListItem;
