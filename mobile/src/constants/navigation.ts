const NAVIGATION_CONSTANTS = {
  TABS: {
    HOME: {
      NAME: "Home" as const,
      ICON: "🏠",
      LABEL: "Home",
    },
    LEARNING: {
      NAME: "Calendar" as const,
      ICON: "📅",
      LABEL: "Calendar",
    },
    ANALYSIS: {
      NAME: "Analysis" as const,
      ICON: "📊",
      LABEL: "Analysis",
    },
    SETTING: {
      NAME: "Setting" as const,
      ICON: "⚙️",
      LABEL: "Setting",
    },
  },
} as const;

export type TabName =
  (typeof NAVIGATION_CONSTANTS.TABS)[keyof typeof NAVIGATION_CONSTANTS.TABS]["NAME"];
export default NAVIGATION_CONSTANTS;
