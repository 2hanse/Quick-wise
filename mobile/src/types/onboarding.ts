type iconFamily = "Ionicons" | "MaterialIcons" | "Feather";

interface Step {
  id: number;
  iconName: string;
  iconFamily: iconFamily;
  title: string;
  subtitle: string;
  description: string;
  example: string;
  colorClass: string;
}

interface ScrollEvent {
  nativeEvent: {
    contentOffset: { x: number };
  };
}

interface OnboardingScreen {
  component: React.ReactElement;
  key: string;
}

interface OnboardingLoginProps {
  onLoginComplete?: () => void;
}

interface LoginRequiredScreenProps {
  onLoginComplete: () => void;
}
export type { iconFamily };
export {
  Step,
  ScrollEvent,
  OnboardingScreen,
  OnboardingLoginProps,
  LoginRequiredScreenProps,
};
