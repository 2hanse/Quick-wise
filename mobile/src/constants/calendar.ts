import { EventCategory } from "../types/calendar";

const CALENDAR_CONSTANTS = {
  CATEGORY_COLORS: {
    [EventCategory.MEETING]: "#ef4444",
    [EventCategory.PRESENTATION]: "#f59e0b",
  },
  CATEGORY_LABELS: {
    [EventCategory.MEETING]: "회의",
    [EventCategory.PRESENTATION]: "발표",
  },
  CATEGORY_ICONS: {
    [EventCategory.MEETING]: "👥💬",
    [EventCategory.PRESENTATION]: "👨‍🏫",
  },
  DAY_NAMES: ["일", "월", "화", "수", "목", "금", "토"],
  MESSAGES: {
    EMPTY_EVENTS: "이 날은 일정이 없습니다",
  },
  THEME: {
    COLORS: {
      BACKGROUND: "#ffffff",
      TEXT_PRIMARY: "#1a1a1a",
      TEXT_SECONDARY: "#6b7280",
      TEXT_DISABLED: "#d1d5db",
      SELECTED_DAY_BG: "#667eea",
      SELECTED_DAY_TEXT: "#ffffff",
      TODAY_TEXT: "#667eea",
      TRANSPARENT: "transparent",
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
