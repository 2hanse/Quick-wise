import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { ScheduleGuideSectionProps, SwipeContent } from "../../types/main";
import CommentContent from "./swipeablecontent/CommentContent";
import ScenarioContent from "./swipeablecontent/ScenarioContent";
import ChecklistContent from "./swipeablecontent/ChecklistContent";
import mainPageConstants from "../../constants/main";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ScheduleGuideSection = ({ swipeContents }: ScheduleGuideSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      contentOffsetX /
        (SCREEN_WIDTH - mainPageConstants.TEXT.SWIPE_CONTENT.CARD_PADDING)
    );
    setCurrentIndex(index);
  };

  const renderContent = (content: SwipeContent) => {
    if (!content.source) return null;

    switch (content.type) {
      case "tip":
        return (
          <CommentContent content={content.content!} source={content.source} />
        );
      case "scenario":
        return (
          <ScenarioContent
            situation={content.situation!}
            response={content.response!}
            source={content.source}
          />
        );
      case "checklist":
        return (
          <ChecklistContent items={content.items!} source={content.source} />
        );
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
        scrollEventThrottle={
          mainPageConstants.TEXT.SWIPE_CONTENT.SCROLL_THROTTLE
        }
      >
        {swipeContents.map((content) => (
          <View
            key={content.id}
            style={{
              width:
                SCREEN_WIDTH -
                mainPageConstants.TEXT.SWIPE_CONTENT.CARD_PADDING,
            }}
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
