import { EventCategory } from "../types/calendar";

const CALENDAR_CONSTANTS = {
  CATEGORY_COLORS: {
    [EventCategory.MEETING]: "#ef4444",
    [EventCategory.PRESENTATION]: "#f59e0b",
    DEFAULT: "#3b82f6",
  },
  CATEGORY_LABELS: {
    [EventCategory.MEETING]: "회의",
    [EventCategory.PRESENTATION]: "발표",
    DEFAULT: "일반",
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
    ERROR_CREATE_EVENT: "일정 생성에 실패했습니다",
    ERROR_UPDATE_EVENT: "일정 수정에 실패했습니다",
    ERROR_DELETE_EVENT: "일정 삭제에 실패했습니다",
    EVENT_DELETED: "일정이 삭제되었습니다",
    CONFIRM_DELETE: "이 일정을 삭제하시겠습니까?",
  },
  LOG_PREFIXES: {
    FETCH_ERROR: "[Calendar Fetch Error]",
    CREATE_ERROR: "[Calendar Create Error]",
    UPDATE_ERROR: "[Calendar Update Error]",
    DELETE_ERROR: "[Calendar Delete Error]",
  },
  FORM: {
    LABELS: {
      TITLE: "제목",
      START_TIME: "시작 시간",
      END_TIME: "종료 시간",
      ALL_DAY: "종일",
      LOCATION: "위치",
      DESCRIPTION: "설명",
      MODAL_TITLE: "새 일정 추가",
    },
    PLACEHOLDERS: {
      TITLE: "일정 제목을 입력하세요",
      LOCATION: "장소를 입력하세요 (선택)",
      DESCRIPTION: "상세 설명을 입력하세요 (선택)",
    },
    BUTTONS: {
      SAVE: "저장",
      CANCEL: "취소",
      DELETE: "삭제",
    },
    MODAL_TITLE: "새 일정 추가",
    EDIT_MODAL_TITLE: "일정 수정",
    ALERT_TITLES: {
      INPUT_ERROR: "입력 오류",
      TIME_ERROR: "시간 오류",
      DELETE_CONFIRM: "삭제 확인",
    },
    VALIDATION: {
      TITLE_REQUIRED: "제목을 입력해주세요",
      TIME_INVALID: "종료 시간이 시작 시간보다 빨라요",
    },
  },
  TOAST: {
    TYPES: {
      SUCCESS: "success",
    },
    POSITION: {
      BOTTOM: "bottom",
    },
    SETTINGS: {
      VISIBILITY_TIME: 3000,
      BOTTOM_OFFSET: 100,
    },
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
      SWITCH_TRACK_FALSE: "#d1d5db",
      SWITCH_TRACK_TRUE: "#3b82f6",
      SWITCH_THUMB: "#ffffff",
      DELETE_BACKGROUND: "#ef4444",
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
    SWIPEABLE: {
      DELETE_WIDTH: 80,
      CONTENT_MARGIN: 8,
      ICON_SIZE: 32,
      FRICTION: 2,
      THRESHOLD: 60,
    },
  },
} as const;

export default CALENDAR_CONSTANTS;
