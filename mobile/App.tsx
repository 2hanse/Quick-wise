import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./src/components/SplashScreen";
import OnboardingContainer from "./src/components/onboarding/OnboardingContainer";
import MainPage from "./src/components/mainscreen/MainScreen";
import BottomNavigation from "./src/components/BottomNavigation";
import { STORAGE_KEYS } from "./src/constants/storage";
import { TabName } from "./src/constants/navigation";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabName>("Home");

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );
      setHasCompletedOnboarding(completed === "true");
    } catch (error) {
      console.error("Failed to check onboarding status:", error);
    }
  };

  const handleSplashComplete = useCallback(() => {
    setIsLoading(false);
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [hasCompletedOnboarding]);

  const handleOnboardingComplete = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
      setShowOnboarding(false);
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error("Failed to save onboarding status:", error);
    }
  }, []);

  const handleTabPress = (tab: TabName) => {
    setCurrentTab(tab);
  };

  const renderScreen = () => {
    if (isLoading) {
      return <SplashScreen onComplete={handleSplashComplete} />;
    }

    if (showOnboarding) {
      return <OnboardingContainer onComplete={handleOnboardingComplete} />;
    }

    switch (currentTab) {
      case "Home":
        return <MainPage />;
      default:
        return <MainPage />;
    }
  };

  const showBottomNavigation = !isLoading && !showOnboarding;

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1">
        {renderScreen()}
        {showBottomNavigation && (
          <BottomNavigation
            activeTab={currentTab}
            onTabPress={handleTabPress}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

export default App;
