import React from "react";
import { View, Text } from "react-native";
import mainPageConstants from "../../constants/main";
import type { SwipeContent } from "../../types/main";

interface ScheduleGuideSectionProps {
  swipeContents: SwipeContent[];
}

const ScheduleGuideSection = ({ swipeContents }: ScheduleGuideSectionProps) => {
  const { TEXT } = mainPageConstants;

  return (
    <View className="bg-white rounded-2xl p-5 mb-2.5 min-h-[220px] border border-amber-200">
      <View>
        <Text className="text-[17px] font-bold text-[#1a1a1a] mb-3.5">
          {TEXT.SWIPE_CONTENT.EFFECTS_TITLE}
        </Text>
        {swipeContents[0].effects?.map((effect) => (
          <View key={effect.id} className="flex-row items-start gap-2 mb-2.5">
            <Text className="text-[#667eea] font-bold mt-0.5 text-[15px]">
              •
            </Text>
            <Text className="text-[15px] leading-6 flex-1">
              {effect.highlight ? (
                <>
                  <Text className="text-[#667eea] font-semibold">
                    {effect.highlight}
                  </Text>
                  {effect.description && (
                    <>
                      <Text className="text-[#9ca3af]"> → </Text>
                      <Text className="text-[#4b5563] font-medium">
                        {effect.description}
                      </Text>
                    </>
                  )}
                </>
              ) : (
                <Text className="text-[#4b5563] font-medium">
                  {effect.description}
                </Text>
              )}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-center gap-1.5 mt-4">
        {swipeContents.map((content, index) => (
          <View
            key={content.id}
            className={`h-1.5 rounded-full ${
              index === 0 ? "w-5 bg-[#667eea]" : "w-1.5 bg-[#e5e7eb]"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ScheduleGuideSection;
