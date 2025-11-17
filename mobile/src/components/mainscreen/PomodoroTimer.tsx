import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { PomodoroTimerProps } from "../../types/main";
import mainPageConstants from "../../constants/main";
import {
  calculateRemainingMinutes,
  getTimerPercentage,
  getTimerColor,
  formatTimerDisplay,
} from "../../utils/mainscreen/timerCalculator";
import { formatTime } from "../../utils/mainscreen/calendarEventConverter";

const PomodoroTimer = ({ schedule }: PomodoroTimerProps) => {
  const [remainingMinutes, setRemainingMinutes] = useState(
    calculateRemainingMinutes(schedule.startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingMinutes(calculateRemainingMinutes(schedule.startTime));
    }, mainPageConstants.TIMER.UPDATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [schedule.startTime]);

  if (remainingMinutes <= 0) {
    return null;
  }

  const percentage = getTimerPercentage(remainingMinutes);
  const color = getTimerColor(remainingMinutes);
  const { CONTAINER, RADIUS, STROKE_WIDTH } = mainPageConstants.TIMER.SIZE;
  const { BACKGROUND } = mainPageConstants.TIMER.COLORS;
  const { TEXT, ICONS } = mainPageConstants;

  const circumference = 2 * Math.PI * RADIUS;
  const strokeDashoffset = circumference * (percentage / 100);
  const center = CONTAINER / 2;

  return (
    <View className="bg-white rounded-2xl p-5 mb-2.5 border border-gray-200">
      <View className="items-center mb-4">
        <View
          style={{ width: CONTAINER, height: CONTAINER, position: "relative" }}
        >
          <Svg width={CONTAINER} height={CONTAINER}>
            <Circle
              cx={center}
              cy={center}
              r={RADIUS}
              stroke={BACKGROUND}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />

            <Circle
              cx={center}
              cy={center}
              r={RADIUS}
              stroke={color}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          </Svg>
          <View
            style={{
              position: "absolute",
              width: CONTAINER,
              height: CONTAINER,
              top: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-[14px] text-gray-500 mb-1">
              {TEXT.TIMER.REMAINING}
            </Text>
            <Text className="text-[28px] font-bold text-[#1a1a1a]">
              {formatTimerDisplay(remainingMinutes)}
            </Text>
          </View>
        </View>
      </View>

      <View className="items-center mb-3">
        <Text className="text-[18px] font-semibold text-[#1a1a1a] mb-1">
          [ {formatTime(schedule.startTime, false)} ]
        </Text>
        <Text className="text-[20px] font-bold text-[#1a1a1a]">
          {schedule.title}
        </Text>
      </View>

      {schedule.location && schedule.location !== "위치 정보 없음" && (
        <View className="flex-row items-center justify-center gap-1.5">
          <Text className="text-[15px] text-[#ef4444]">{ICONS.LOCATION}</Text>
          <Text className="text-[15px] text-[#6b7280] font-medium">
            {schedule.location}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PomodoroTimer;
