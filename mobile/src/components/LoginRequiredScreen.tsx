import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingLogin from "./onboarding/OnboardingLogin";
import { LoginRequiredScreenProps } from "../types/onboarding";

const LoginRequiredScreen = ({ onLoginComplete }: LoginRequiredScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <OnboardingLogin onLoginComplete={onLoginComplete} />
    </SafeAreaView>
  );
};

export default LoginRequiredScreen;
