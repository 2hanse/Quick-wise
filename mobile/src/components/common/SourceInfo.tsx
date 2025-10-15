import React from "react";
import { View, Text } from "react-native";
import mainPageConstants from "../../constants/main";
import { SourceInfoProps } from "../../types/ai";

const SourceInfo: React.FC<SourceInfoProps> = ({ source }) => (
  <View className="mt-4 pt-4 border-t border-[#f3f4f6]">
    <Text className="text-[12px] text-[#9ca3af] mb-1">
      {mainPageConstants.TEXT.SWIPE_CONTENT.SOURCE.TITLE} {source.videoTitle}
    </Text>
    <Text className="text-[11px] text-[#9ca3af]">
      {mainPageConstants.TEXT.SWIPE_CONTENT.SOURCE.SPEAKER} {source.speaker}
    </Text>
  </View>
);

export default SourceInfo;
