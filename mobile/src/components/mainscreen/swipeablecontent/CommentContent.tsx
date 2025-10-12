import React from "react";
import { View, Text } from "react-native";
import { CommentContentProps } from "../../../types/main";
import mainPageConstants from "../../../constants/main";

const CommentContent = ({ content, source }: CommentContentProps) => {
  return (
    <View>
      <View className="flex-row items-start gap-2 mb-4">
        <Text className="text-[20px]">{mainPageConstants.ICONS.EFFECTS}</Text>
        <Text className="text-[17px] font-bold text-[#1a1a1a] flex-1">
          {content}
        </Text>
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

export default CommentContent;
