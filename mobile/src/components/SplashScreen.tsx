import React, { useState, useEffect, useRef } from "react";
import { Text, View, Animated } from "react-native";
import "../../global.css";

const useTypewriter = (text: string, speed: number = 180) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
};

interface SplashScreenProps {
  onComplete?: () => void;
}

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

  const typedText = useTypewriter("QuickWise", 120);
  const dots = [{ id: "pulse-a" }, { id: "pulse-b" }, { id: "pulse-c" }];

  useEffect(() => {
    const cursorBlink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    cursorBlink.start();
    return () => cursorBlink.stop();
  }, [cursorOpacity]);

  useEffect(() => {
    if (currentStep >= 4) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(loadingPulse, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(loadingPulse, {
            toValue: 0.7,
            duration: 1200,
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
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 1500),

      setTimeout(() => {
        setCurrentStep(2);
        Animated.timing(scheduleBox, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 1800),

      setTimeout(() => {
        setCurrentStep(3);
        Animated.timing(scenarioBox, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 2100),

      setTimeout(() => {
        setCurrentStep(4);
        Animated.timing(adviceBox, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 2400),

      setTimeout(() => {
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 2700),

      setTimeout(() => {
        setLoadingComplete(true);
        onComplete?.();
      }, 3700),
    ];

    return () => timers.forEach(clearTimeout);
  }, [
    onComplete,
    descriptionAnimation,
    scheduleBox,
    scenarioBox,
    adviceBox,
    loadingAnimation,
  ]);

  return (
    <View className="flex-1 bg-white justify-center items-center px-8">
      <View className="items-center mb-8">
        <View className="flex-row items-center">
          <Text className="text-5xl font-bold text-blue-600 tracking-wide">
            {typedText}
          </Text>
          {typedText.length < 9 && (
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
          당신의 일정이 성장의 기회가 됩니다.
        </Text>
        <Text className="text-base text-gray-600 text-center leading-6">
          TED, 세바시 등 전문 강사들의 강연을 {"\n"}내 상황에 맞게 적용해드려요.
        </Text>
      </Animated.View>
      <View className="flex-row justify-around w-full px-5 mb-16">
        <Animated.View
          style={{ transform: [{ scale: scheduleBox }] }}
          className="items-center"
        >
          <View className="w-14 h-14 bg-blue-50 border-blue-100 rounded-2xl justify-center items-center mb-2">
            <Text className="text-2xl">📅</Text>
          </View>
          <Text className="text-gray-700 text-sm text-center font-medium">
            일정 연동
          </Text>
        </Animated.View>

        <Animated.View
          style={{ transform: [{ scale: scenarioBox }] }}
          className="items-center"
        >
          <View className="w-14 h-14 bg-blue-50 border-blue-100 rounded-2xl justify-center items-center mb-2">
            <Text className="text-2xl">🚀</Text>
          </View>
          <Text className="text-gray-700 text-sm text-center font-medium">
            실행 시나리오
          </Text>
        </Animated.View>

        <Animated.View
          style={{ transform: [{ scale: adviceBox }] }}
          className="items-center"
        >
          <View className="w-14 h-14 bg-blue-50 border-blue-100 rounded-2xl justify-center items-center mb-2">
            <Text className="text-2xl">🎯</Text>
          </View>
          <Text className="text-gray-700 text-sm text-center font-medium">
            맞춤 조언
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        style={{ opacity: loadingAnimation }}
        className="absolute bottom-16"
      >
        <Animated.Text
          style={{ opacity: loadingPulse }}
          className="text-gray-500 text-base text-center font-medium"
        >
          당신만의 성장 코치를 준비하고 있어요...
        </Animated.Text>

        <View className="flex-row justify-center mt-3 space-x-1">
          {dots.map((dot) => (
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
