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

export type { iconFamily };
export { Step };
