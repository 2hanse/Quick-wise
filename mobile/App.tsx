import React, { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "./src/components/SplashScreen";
import OnboardingContainer from "./src/components/onboarding/OnboardingContainer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashComplete = useCallback(() => setIsLoading(false), []);

  return (
    <GestureHandlerRootView className="flex-1">
      {isLoading ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <OnboardingContainer />
      )}
    </GestureHandlerRootView>
  );
}

export default App;
