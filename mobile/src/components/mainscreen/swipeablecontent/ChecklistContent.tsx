import React from "react";
import { View, Text } from "react-native";
import type { Checklist } from "../../../types/main";
import mainPageConstants from "../../../constants/main";

interface ChecklistContentProps {
  checklist: Checklist;
}

const ChecklistContent = ({ checklist }: ChecklistContentProps) => {
  return (
    <View>
      <Text className="text-[17px] font-bold text-[#1a1a1a] mb-3.5">
        {checklist.title}
      </Text>

      <View className="gap-3">
        {checklist.items.map((item) => (
          <View key={item.id} className="flex-row items-start gap-3">
            <View
              className={`w-5 h-5 rounded items-center justify-center ${
                item.completed ? "bg-[#10b981]" : "bg-[#e5e7eb]"
              }`}
            >
              {item.completed && (
                <Text className="text-white text-[12px] font-bold">✓</Text>
              )}
            </View>
            <Text
              className={`text-[15px] flex-1 ${
                item.completed
                  ? "text-[#6b7280] line-through"
                  : "text-[#1a1a1a] font-medium"
              }`}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {checklist.corePoint && (
        <View className="mt-4 pt-4 border-t border-[#f3f4f6]">
          <View className="flex-row items-center gap-2">
            <Text className="text-[16px]">💡</Text>
            <Text className="text-[14px] font-semibold text-[#667eea]">
              {mainPageConstants.TEXT.CHECKLIST_KEYPOINT.TITLE}
            </Text>
          </View>
          <Text className="text-[14px] text-[#4b5563] font-medium mt-2">
            "{checklist.corePoint}"
          </Text>
        </View>
      )}
    </View>
  );
};

export default ChecklistContent;
