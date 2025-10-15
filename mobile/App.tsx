import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import SplashScreen from "./src/components/SplashScreen";
import OnboardingContainer from "./src/components/onboarding/OnboardingContainer";
import MainPage from "./src/components/mainscreen/MainScreen";
import CalendarScreen from "./src/components/calendar/CalendarScreen";
import SettingScreen from "./src/components/setting/SettingScreen";
import LoginRequiredScreen from "./src/components/LoginRequiredScreen";
import BottomNavigation from "./src/components/BottomNavigation";
import { STORAGE_KEYS } from "./src/constants/storage";
import { TabName } from "./src/constants/navigation";
import { configureGoogleSignIn } from "./src/services/authService";
import { APP_MESSAGES } from "./src/constants/app";
import useAuthStore from "./src/stores/authStore";
import useNotificationSetup from "./src/hooks/notification/useNotificationSetup";

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabName>("Home");

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useNotificationSetup();

  useEffect(() => {
    configureGoogleSignIn();
    checkAppStatus();
  }, []);

  const checkAppStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );

      setHasCompletedOnboarding(onboardingCompleted === "true");
      await checkAuthStatus();
    } catch (error) {
      console.error(APP_MESSAGES.ERROR.CHECK_APP_STATUS_FAILED, error);
    } finally {
      setIsAppLoading(false);
    }
  };

  const handleSplashComplete = useCallback(() => {
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
      console.error(APP_MESSAGES.ERROR.SAVE_ONBOARDING_STATUS_FAILED, error);
    }
  }, []);

  const handleTabPress = (tab: TabName) => {
    setCurrentTab(tab);
  };

  const renderScreen = () => {
    if (isAppLoading || isAuthLoading) {
      return <SplashScreen onComplete={handleSplashComplete} />;
    }

    if (showOnboarding) {
      return <OnboardingContainer onComplete={handleOnboardingComplete} />;
    }

    if (!isLoggedIn) {
      return <LoginRequiredScreen />;
    }

    switch (currentTab) {
      case "Home":
        return (
          <MainPage onNavigateToCalendar={() => handleTabPress("Calendar")} />
        );
      case "Calendar":
        return (
          <CalendarScreen onNavigateToHome={() => handleTabPress("Home")} />
        );
      case "Setting":
        return <SettingScreen />;
      default:
        return (
          <MainPage onNavigateToCalendar={() => handleTabPress("Calendar")} />
        );
    }
  };

  const showBottomNavigation =
    !isAppLoading && !isAuthLoading && !showOnboarding && isLoggedIn;

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
      <Toast />
    </GestureHandlerRootView>
  );
}

export default App;
