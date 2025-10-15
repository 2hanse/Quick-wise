import React from "react";
import { View, Text } from "react-native";
import SourceInfo from "../../common/SourceInfo";
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
      <SourceInfo source={source} />
    </View>
  );
};

export default ScenarioContent;
