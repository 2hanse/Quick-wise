import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import type { SwipeContent } from "../../types/main";
import CommentContent from "./swipeablecontent/CommentContent";
import ScenarioContent from "./swipeablecontent/ScenarioContent";
import ChecklistContent from "./swipeablecontent/ChecklistContent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ScheduleGuideSectionProps {
  swipeContents: SwipeContent[];
}

const ScheduleGuideSection = ({ swipeContents }: ScheduleGuideSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (SCREEN_WIDTH - 24));
    setCurrentIndex(index);
  };

  const renderContent = (content: SwipeContent) => {
    switch (content.type) {
      case "comment":
        return <CommentContent commentItems={content.commentItems || []} />;
      case "scenario":
        return content.scenario ? (
          <ScenarioContent scenario={content.scenario} />
        ) : null;
      case "checklist":
        return content.checklist ? (
          <ChecklistContent checklist={content.checklist} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <View className="bg-white rounded-2xl mb-2.5 border border-amber-200">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {swipeContents.map((content) => (
          <View
            key={content.id}
            style={{ width: SCREEN_WIDTH - 24 }}
            className="p-5"
          >
            {renderContent(content)}
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center gap-1.5 pb-4">
        {swipeContents.map((content, index) => (
          <View
            key={content.id}
            className={`h-1.5 rounded-full ${
              index === currentIndex ? "w-5 bg-[#667eea]" : "w-1.5 bg-[#e5e7eb]"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ScheduleGuideSection;
