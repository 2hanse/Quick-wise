import { useRef } from "react";
import { PanResponder } from "react-native";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  GESTURE_ACTIVATION_THRESHOLD,
} from "../../constants/gesture";

const useCalendarGesture = (onNavigateToHome: () => void) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return (
          Math.abs(dx) > Math.abs(dy) &&
          Math.abs(dx) > GESTURE_ACTIVATION_THRESHOLD
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;

        if (dx > SWIPE_THRESHOLD || vx > SWIPE_VELOCITY_THRESHOLD / 1000) {
          onNavigateToHome();
        }
      },
    })
  ).current;

  return panResponder;
};

export default useCalendarGesture;
