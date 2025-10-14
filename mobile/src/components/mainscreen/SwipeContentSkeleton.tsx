import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import mainPageConstants from "../../constants/main";

const SwipeContentSkeleton = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: mainPageConstants.SKELETON.ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: mainPageConstants.SKELETON.ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [shimmerValue]);

  const opacity = shimmerValue.interpolate({
    inputRange: [
      mainPageConstants.SKELETON.ANIMATION_START,
      mainPageConstants.SKELETON.ANIMATION_END,
    ],
    outputRange: [
      mainPageConstants.SKELETON.OPACITY_MIN,
      mainPageConstants.SKELETON.OPACITY_MAX,
    ],
  });
  return (
    <View
      style={{ height: mainPageConstants.AI_CONTENT.FIXED_HEIGHT }}
      className="mx-3 mb-2.5"
    >
      <Animated.View
        style={{ opacity }}
        className="h-full rounded-2xl bg-gray-200"
      />
    </View>
  );
};

export default SwipeContentSkeleton;
