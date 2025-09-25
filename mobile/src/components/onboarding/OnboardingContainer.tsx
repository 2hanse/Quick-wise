import React from "react";
import { View, ScrollView, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingScreen1 from "./OnboardingScreen1";
import OnboardingScreen2 from "./OnboardingScreen2";
import OnboardingScreen3 from "./OnboardingScreen3";
import OnboardingScreen4 from "./OnboardingScreen4";

const { width: screenWidth } = Dimensions.get("window");

const OnboardingContainer = () => {
  const screens = [
    { component: <OnboardingScreen1 />, key: "screen1" },
    { component: <OnboardingScreen2 />, key: "screen2" },
    { component: <OnboardingScreen3 />, key: "screen3" },
    { component: <OnboardingScreen4 />, key: "screen4" },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView
        edges={["top", "left", "right"]}
        className="flex-1 bg-white"
      >
        <View className="flex-1">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="flex-1"
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default OnboardingContainer;
