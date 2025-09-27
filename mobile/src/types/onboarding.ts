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

export type { iconFamily };
export { Step, ScrollEvent, OnboardingScreen };
