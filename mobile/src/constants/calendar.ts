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
    [EventCategory.MEETING]: "👥",
    [EventCategory.PRESENTATION]: "🗣️",
  },
  NAVIGATION_ICONS: {
    PREV: "<",
    NEXT: ">",
  },
  DAY_NAMES: ["일", "월", "화", "수", "목", "금", "토"],
  MONTH_NAMES: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  MESSAGES: {
    EMPTY_EVENTS: "이 날은 일정이 없습니다",
    TODAY_BUTTON: "오늘",
    LOADING_EVENTS: "일정을 불러오는 중...",
    ERROR_FETCH_EVENTS: "일정을 불러오는데 실패했습니다",
  },
  LOG_PREFIXES: {
    FETCH_ERROR: "[Calendar Fetch Error]",
  },
  THEME: {
    COLORS: {
      BACKGROUND: "#ffffff",
      TEXT_PRIMARY: "#1a1a1a",
      TEXT_SECONDARY: "#6b7280",
      TEXT_DISABLED: "#d1d5db",
      SELECTED_DAY_BG: "#dbeafe",
      SELECTED_DAY_TEXT: "#1a1a1a",
      TODAY_TEXT: "#ffffff",
      TODAY_HIGHLIGHT: "#3b82f6",
      TRANSPARENT: "transparent",
      LOADING_INDICATOR: "#3b82f6",
      ERROR_TEXT: "#ef4444",
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
      DAY_CIRCLE_SIZE: 36,
    },
  },
} as const;

export default CALENDAR_CONSTANTS;
