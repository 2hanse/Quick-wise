import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingScreen1 from "./OnboardingIntro";
import OnboardingScreen2 from "./OnboardingGuide";
import OnboardingScreen3 from "./OnboardingLogin";
import OnboardingScreen4 from "./OnboardingNotification";
import { ScrollEvent, OnboardingScreen } from "../../types/onboarding";
import {
  SCROLL_EVENT_THROTTLE,
  NAVIGATION_ACTIVE_OPACITY,
  SCREEN_KEYS,
  NAVIGATION_ICONS,
} from "../../constants/onboarding";

const { width: screenWidth } = Dimensions.get("window");

const OnboardingContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const screens: OnboardingScreen[] = [
    { component: <OnboardingScreen1 />, key: SCREEN_KEYS.SCREEN_1 },
    { component: <OnboardingScreen2 />, key: SCREEN_KEYS.SCREEN_2 },
    { component: <OnboardingScreen3 />, key: SCREEN_KEYS.SCREEN_3 },
    { component: <OnboardingScreen4 />, key: SCREEN_KEYS.SCREEN_4 },
  ];

  const handleScroll = (event: ScrollEvent) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < screens.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: prevIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView
        edges={["top", "left", "right"]}
        className="flex-1 bg-white"
      >
        <View className="flex-1 relative">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={SCROLL_EVENT_THROTTLE}
            className="flex-1"
            bounces={false}
          >
            {screens.map((screen) => (
              <View
                key={screen.key}
                className="flex-1"
                style={{ width: screenWidth }}
              >
                {screen.component}
              </View>
            ))}
          </ScrollView>

          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 z-10"
              activeOpacity={NAVIGATION_ACTIVE_OPACITY}
            >
              <Text className="text-3xl text-gray-600 font-light">
                {NAVIGATION_ICONS.PREVIOUS}
              </Text>
            </TouchableOpacity>
          )}

          {currentIndex < screens.length - 1 && (
            <TouchableOpacity
              onPress={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 z-10"
              activeOpacity={NAVIGATION_ACTIVE_OPACITY}
            >
              <Text className="text-3xl text-gray-600 font-light">
                {NAVIGATION_ICONS.NEXT}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="px-5 pb-8 pt-5 bg-white">
          <View className="flex-row justify-center items-center">
            {screens.map((screen, index) => (
              <View
                key={`${screen.key}-indicator`}
                className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OnboardingContainer;
