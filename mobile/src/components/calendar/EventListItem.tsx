import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import type { EventListItemProps } from "../../types/calendar";
import CALENDAR_CONSTANTS from "../../constants/calendar";

const EventListItem = ({ event, onPress, onDelete }: EventListItemProps) => {
  const { CATEGORY_COLORS, CATEGORY_LABELS, THEME } = CALENDAR_CONSTANTS;
  const swipeableRef = useRef<SwipeableMethods>(null);

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

  const handleDelete = () => {
    Alert.alert(
      CALENDAR_CONSTANTS.FORM.ALERT_TITLES.DELETE_CONFIRM,
      CALENDAR_CONSTANTS.MESSAGES.CONFIRM_DELETE,
      [
        {
          text: CALENDAR_CONSTANTS.FORM.BUTTONS.CANCEL,
          style: "cancel",
          onPress: () => swipeableRef.current?.close(),
        },
        {
          text: CALENDAR_CONSTANTS.FORM.BUTTONS.DELETE,
          style: "destructive",
          onPress: () => onDelete(event.id),
        },
      ]
    );
  };

  const renderRightActions = () => {
    return (
      <View
        className="justify-center items-center"
        style={{
          backgroundColor: THEME.COLORS.DELETE_BACKGROUND,
          width: 100,
        }}
      >
        <Text style={{ fontSize: THEME.SWIPEABLE.ICON_SIZE }}>🗑️</Text>
        <Text className="text-white text-[12px] font-semibold mt-1">
          {CALENDAR_CONSTANTS.FORM.BUTTONS.DELETE}
        </Text>
      </View>
    );
  };

  const renderLeftActions = () => {
    return (
      <View
        className="justify-center items-center"
        style={{
          backgroundColor: THEME.COLORS.DELETE_BACKGROUND,
          width: 100,
        }}
      >
        <Text style={{ fontSize: THEME.SWIPEABLE.ICON_SIZE }}>🗑️</Text>
        <Text className="text-white text-[12px] font-semibold mt-1">
          {CALENDAR_CONSTANTS.FORM.BUTTONS.DELETE}
        </Text>
      </View>
    );
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableWillOpen={handleDelete}
      friction={2}
      overshootFriction={8}
      enableTrackpadTwoFingerGesture
    >
      <View className="bg-white border-b border-gray-100 px-4">
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
      </View>
    </ReanimatedSwipeable>
  );
};

export default EventListItem;
