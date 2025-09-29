import React from "react";
import { View, Text } from "react-native";
import mainPageConstants from "../../../constants/main";
import type { CommentItem } from "../../../types/main";

interface CommentContentProps {
  commentItems: CommentItem[];
}

const CommentContent = ({ commentItems }: CommentContentProps) => {
  const { TEXT } = mainPageConstants;

  return (
    <View>
      <Text className="text-[17px] font-bold text-[#1a1a1a] mb-3.5">
        {TEXT.SWIPE_CONTENT.COMMENTITEM_TITLE}
      </Text>
      {commentItems.map((commentItem) => (
        <View
          key={commentItem.id}
          className="flex-row items-start gap-2 mb-2.5"
        >
          <Text className="text-[#667eea] font-bold mt-0.5 text-[15px]">•</Text>
          <Text className="text-[15px] leading-6 flex-1">
            {commentItem.highlight ? (
              <>
                <Text className="text-[#667eea] font-semibold">
                  {commentItem.highlight}
                </Text>
                {commentItem.description && (
                  <>
                    <Text className="text-[#9ca3af]"> → </Text>
                    <Text className="text-[#4b5563] font-medium">
                      {commentItem.description}
                    </Text>
                  </>
                )}
              </>
            ) : (
              <Text className="text-[#4b5563] font-medium">
                {commentItem.description}
              </Text>
            )}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CommentContent;
