import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  HEADER_TITLE,
  HEADER_SUBTEXT,
  ICON_SIZE,
  STEPS,
} from "../../constants/onboarding";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { Step } from "../../types/onboarding";

const exampleIcons = [
  <Ionicons name="calendar" size={ICON_SIZE} color="#9CA3AF" />,
  <MaterialIcons name="track-changes" size={ICON_SIZE} color="#9CA3AF" />,
  <Ionicons name="time" size={ICON_SIZE} color="#9CA3AF" />,
];

const OnboardingGuide = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const renderIcon = (step: Step) => {
    const iconColor = step.colorClass;

    switch (step.iconFamily) {
      case "Ionicons":
        return (
          <Ionicons
            name={
              step.iconName as React.ComponentProps<typeof Ionicons>["name"]
            }
            size={ICON_SIZE}
            color={iconColor}
          />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons
            name={
              step.iconName as React.ComponentProps<
                typeof MaterialIcons
              >["name"]
            }
            size={ICON_SIZE}
            color={iconColor}
          />
        );
      case "Feather":
        return (
          <Feather
            name={step.iconName as React.ComponentProps<typeof Feather>["name"]}
            size={ICON_SIZE}
            color={iconColor}
          />
        );
      default:
        return (
          <Ionicons name="help-outline" size={ICON_SIZE} color={iconColor} />
        );
    }
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-8 py-12">
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-blue-600 text-center mb-3">
          {HEADER_TITLE.onboarding2}
        </Text>
        <View className="w-16 h-0.5 bg-gray-400 mx-auto mb-6"></View>
        <Text className="text-gray-600 text-base text-center whitespace-pre-line">
          {HEADER_SUBTEXT.onboarding2}
        </Text>
      </View>

      <View className="w-full items-center">
        <View className="flex-row justify-center items-center mb-2 w-full">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <View
                className={`flex-col items-center ${
                  index === currentStep ? "scale-110" : "scale-95 opacity-60"
                }`}
              >
                <View
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    index === currentStep
                      ? step.colorClass
                      : "bg-white border-gray-300"
                  }`}
                >
                  {renderIcon(step)}
                </View>
                <Text className="text-xs text-gray-500 mt-2 font-medium">
                  {step.id}
                </Text>
              </View>
              {index < STEPS.length - 1 && (
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="#D1D5DB"
                  className="mx-2"
                />
              )}
            </React.Fragment>
          ))}
        </View>

        <View className="w-full items-center">
          <View className="flex justify-center mb-4 mt-4">
            <View className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
              {renderIcon(STEPS[currentStep])}
            </View>
          </View>

          <View className="items-center mb-2 px-2">
            <Text className="text-xl font-bold text-gray-900 mb-1 text-center">
              {STEPS[currentStep].title}
            </Text>
            <Text className="text-sm text-gray-500 mb-2 text-center">
              {STEPS[currentStep].subtitle}
            </Text>
            <Text className="text-gray-700 text-center leading-relaxed whitespace-pre-line mb-2">
              {STEPS[currentStep].description}
            </Text>
          </View>

          <View
            className={`w-full mx-2 p-4 rounded-xl border-2 ${STEPS[currentStep].colorClass} mt-2 mb-2`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900">예시</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {STEPS[currentStep].example}
                </Text>
              </View>
              <View className="ml-4">{exampleIcons[currentStep]}</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnboardingGuide;
