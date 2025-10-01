const CALENDAR_CONSTANTS = {
  THEME: {
    COLORS: {
      BACKGROUND: "#ffffff",
      TEXT_PRIMARY: "#1a1a1a",
      TEXT_SECONDARY: "#6b7280",
      TEXT_DISABLED: "#d1d5db",
      SELECTED_DAY_BG: "#667eea",
      SELECTED_DAY_TEXT: "#ffffff",
      TODAY_TEXT: "#667eea",
    },
    FONT_SIZES: {
      MONTH: 18,
      DAY: 15,
      DAY_HEADER: 13,
    },
    FONT_WEIGHTS: {
      MONTH: "bold" as const,
    },
    LAYOUT: {
      HEIGHT: 400,
    },
  },
} as const;

export default CALENDAR_CONSTANTS;
