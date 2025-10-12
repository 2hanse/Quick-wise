import React from "react";
import { View, Text } from "react-native";
import { ScenarioContentProps } from "../../../types/main";
import mainPageConstants from "../../../constants/main";

const ScenarioContent = ({
  situation,
  response,
  source,
}: ScenarioContentProps) => {
  return (
    <View>
      <View className="mb-4">
        <View className="flex-row items-start gap-2 mb-3">
          <Text className="text-[16px] font-semibold text-[#667eea]">
            {mainPageConstants.TEXT.SWIPE_CONTENT.SCENARIO.SITUATION_LABEL}
          </Text>
          <Text className="text-[15px] text-[#4b5563] font-medium flex-1">
            {situation}
          </Text>
        </View>

        <View className="flex-row items-start gap-2">
          <Text className="text-[16px] font-semibold text-[#10b981]">
            {mainPageConstants.TEXT.SWIPE_CONTENT.SCENARIO.RESPONSE_LABEL}
          </Text>
          <Text className="text-[15px] text-[#1a1a1a] font-medium flex-1">
            {response}
          </Text>
        </View>
      </View>

      <View className="mt-4 pt-4 border-t border-[#f3f4f6]">
        <Text className="text-[12px] text-[#9ca3af] mb-1">
          {mainPageConstants.TEXT.SWIPE_CONTENT.SOURCE.TITLE}:{" "}
          {source.videoTitle}
        </Text>
        <Text className="text-[11px] text-[#9ca3af]">
          {mainPageConstants.TEXT.SWIPE_CONTENT.SOURCE.SPEAKER}:{" "}
          {source.speaker}
        </Text>
      </View>
    </View>
  );
};

export default ScenarioContent;
