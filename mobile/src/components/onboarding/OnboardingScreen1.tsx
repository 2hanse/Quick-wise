import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  TIMINGS_DURATION,
  STAGGER_DELAY,
  ANIMATION_START_DELAY,
  FEATURES_TEXTS,
  SLOGANS_TEXTS,
  DESCRIPTION,
} from "../../constants/onboarding";
import { APP_NAME } from "../../constants/splash";

const OnboardingScreen1 = () => {
  const animations = useRef(
    FEATURES_TEXTS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animateFeatures = setTimeout(() => {
      const sequence = FEATURES_TEXTS.map((_, index) =>
        Animated.timing(animations[index], {
          toValue: 1,
          duration: TIMINGS_DURATION,
          useNativeDriver: true,
        })
      );
      Animated.stagger(STAGGER_DELAY, sequence).start();
    }, ANIMATION_START_DELAY);
    return () => clearTimeout(animateFeatures);
  }, [animations]);

  return (
    <View className="flex-1 bg-white justify-center items-center px-8 py-12 flex-col">
      <View className="items-center mb-20">
        <View className="mb-12">
          <Text className="text-6xl font-bold text-blue-600 text-center mb-3">
            {APP_NAME}
          </Text>
          <View className="w-16 h-0.5 bg-gray-400 mx-auto"></View>
        </View>

        <View className="mb-10 w-full px-4">
          <Text className="text-3xl font-medium text-gray-800 mb-1 text-center">
            {SLOGANS_TEXTS.one}
          </Text>
          <Text className="text-3xl font-medium text-gray-800 text-center">
            {SLOGANS_TEXTS.two}
          </Text>
        </View>

        <Text className="text-lg text-gray-600 font-normal text-center">
          {SLOGANS_TEXTS.sub}
        </Text>
      </View>

      <View className="w-full max-w-sm mb-16 items-center">
        {FEATURES_TEXTS.map((feature, index) => (
          <Animated.View
            key={feature.id}
            className="flex-row items-center py-3"
            style={{
              width: "70%",
              opacity: animations[index],
            }}
          >
            <View className="w-5 h-5 bg-green-600 rounded-full items-center justify-center mt-0.5 mr-3">
              <Ionicons name="checkmark" size={12} color="white" />
            </View>
            <Text className="text-gray-700 text-base">{feature.text}</Text>
          </Animated.View>
        ))}
      </View>

      <View className="items-center max-w-xs mb-12">
        <Text className="text-sm text-gray-500 text-center">
          {DESCRIPTION[0].text}
          {DESCRIPTION[1].text}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingScreen1;
