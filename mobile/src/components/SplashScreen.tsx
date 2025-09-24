import React, { useState, useEffect, useRef } from "react";
import { Text, View, Animated } from "react-native";
import useTypewriter from "../hooks/useTypewriter";
import { FeatureBoxItem, SplashScreenProps } from "../types/splash";
import {
  APP_NAME,
  TYPEWRITER_SPEED,
  CURSOR_BLINK_DURATION,
  STEP_ADVICE_COMPLETE,
  ANIMATION_DURATION,
  STEP_TIMINGS,
  DESCRIPTION_TEXTS,
  FEATURE_BOXES,
  DOTS,
} from "../constants/splash";
import "../../global.css";

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLoadingComplete] = useState(false);

  const descriptionAnimation = useRef(new Animated.Value(0)).current;
  const scheduleBox = useRef(new Animated.Value(0)).current;
  const scenarioBox = useRef(new Animated.Value(0)).current;
  const adviceBox = useRef(new Animated.Value(0)).current;
  const loadingAnimation = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const loadingPulse = useRef(new Animated.Value(0.7)).current;

  const typedText = useTypewriter(APP_NAME, TYPEWRITER_SPEED);

  useEffect(() => {
    const cursorBlink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0.3,
          duration: CURSOR_BLINK_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: CURSOR_BLINK_DURATION,
          useNativeDriver: true,
        }),
      ])
    );
    cursorBlink.start();
    return () => cursorBlink.stop();
  }, [cursorOpacity]);

  useEffect(() => {
    if (currentStep >= STEP_ADVICE_COMPLETE) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(loadingPulse, {
            toValue: 1,
            duration: ANIMATION_DURATION.pulse,
            useNativeDriver: true,
          }),
          Animated.timing(loadingPulse, {
            toValue: 0.7,
            duration: ANIMATION_DURATION.pulse,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [currentStep, loadingPulse]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [
      setTimeout(() => {
        setCurrentStep(1);
        Animated.timing(descriptionAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION.description,
          useNativeDriver: true,
        }).start();
      }, STEP_TIMINGS.description),

      setTimeout(() => {
        setCurrentStep(2);
        Animated.timing(scheduleBox, {
          toValue: 1,
          duration: ANIMATION_DURATION.box,
          useNativeDriver: true,
        }).start();
      }, STEP_TIMINGS.scheduleBox),

      setTimeout(() => {
        setCurrentStep(3);
        Animated.timing(scenarioBox, {
          toValue: 1,
          duration: ANIMATION_DURATION.box,
          useNativeDriver: true,
        }).start();
      }, STEP_TIMINGS.scenarioBox),

      setTimeout(() => {
        setCurrentStep(4);
        Animated.timing(adviceBox, {
          toValue: 1,
          duration: ANIMATION_DURATION.box,
          useNativeDriver: true,
        }).start();
      }, STEP_TIMINGS.adviceBox),

      setTimeout(() => {
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION.loading,
          useNativeDriver: true,
        }).start();
      }, STEP_TIMINGS.loading),

      setTimeout(() => {
        setLoadingComplete(true);
        onComplete?.();
      }, STEP_TIMINGS.complete),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const boxAnimations = [scheduleBox, scenarioBox, adviceBox];

  return (
    <View className="flex-1 bg-white justify-center items-center px-8">
      <View className="items-center mb-8">
        <View className="flex-row items-center">
          <Text className="text-5xl font-bold text-blue-600 tracking-wide">
            {typedText}
          </Text>
          {typedText.length < APP_NAME.length && (
            <Animated.Text
              style={{ opacity: cursorOpacity }}
              className="text-5xl font-bold text-gray-400 ml-1"
            >
              |
            </Animated.Text>
          )}
        </View>
      </View>

      <Animated.View
        style={{ opacity: descriptionAnimation }}
        className="mb-16"
      >
        <Text className="text-xl text-black text-center font-semibold mb-3">
          {DESCRIPTION_TEXTS.title}
        </Text>
        <Text className="text-base text-gray-600 text-center leading-6">
          {DESCRIPTION_TEXTS.subtitle}
        </Text>
      </Animated.View>

      <View className="flex-row justify-around w-full px-5 mb-16">
        {FEATURE_BOXES.map((box: FeatureBoxItem, idx: number) => (
          <Animated.View
            key={box.id}
            style={{ transform: [{ scale: boxAnimations[idx] }] }}
            className="items-center"
          >
            <View className="w-14 h-14 bg-blue-50 border-blue-100 rounded-2xl justify-center items-center mb-2">
              <Text className="text-2xl">{box.icon}</Text>
            </View>
            <Text className="text-gray-700 text-sm text-center font-medium">
              {box.label}
            </Text>
          </Animated.View>
        ))}
      </View>

      <Animated.View
        style={{ opacity: loadingAnimation }}
        className="absolute bottom-16"
      >
        <Animated.Text
          style={{ opacity: loadingPulse }}
          className="text-gray-500 text-base text-center font-medium"
        >
          {DESCRIPTION_TEXTS.loading}
        </Animated.Text>

        <View className="flex-row justify-center mt-3 space-x-1">
          {DOTS.map((dot) => (
            <Animated.View
              key={dot.id}
              style={{
                opacity: loadingPulse,
                transform: [{ scale: loadingPulse }],
              }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
