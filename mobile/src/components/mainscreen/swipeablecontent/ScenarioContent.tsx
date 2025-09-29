import React from "react";
import { View, Text } from "react-native";
import type { Scenario } from "../../../types/main";

interface ScenarioContentProps {
  scenario: Scenario;
}

const ScenarioContent = ({ scenario }: ScenarioContentProps) => {
  return (
    <View>
      <View className="mb-3.5">
        <Text className="text-[17px] font-bold text-[#1a1a1a] mb-2">
          🎬 {scenario.title}
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {scenario.tags.map((tag) => (
            <Text key={tag} className="text-[12px] text-[#667eea] font-medium">
              # {tag}
            </Text>
          ))}
        </View>
      </View>

      <View className="gap-3">
        {scenario.dialogue.map((line) => (
          <View key={line.id} className="flex-row gap-2">
            <Text className="text-[14px] text-[#6b7280] font-medium min-w-[32px]">
              💬 {line.speaker}:
            </Text>
            <Text
              className={`text-[14px] flex-1 ${
                line.isHighlight
                  ? "text-[#ef4444] font-semibold"
                  : "text-[#4b5563] font-medium"
              }`}
            >
              "{line.text}"
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ScenarioContent;
