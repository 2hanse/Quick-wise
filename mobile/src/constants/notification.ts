const NOTIFICATION_CONSTANTS = {
  CHANNEL: {
    ID: "schedule-reminders",
    NAME: "일정 알림",
  },
  ADVANCE_MINUTES: 10,
  PERMISSION: {
    STATUS: {
      GRANTED: "granted" as const,
      DENIED: "denied" as const,
      UNDETERMINED: "undetermined" as const,
    },
  },
  PLATFORM: {
    ANDROID: "android" as const,
  },
  VIBRATION_PATTERN: [0, 250, 250, 250],
  ERROR: {
    PERMISSION_FAILED: "Failed to request notification permission",
    CHANNEL_CREATION_FAILED: "Failed to create notification channel",
  },
  SETTING: {
    TITLE: "알림 설정",
    DESCRIPTION: "일정 10분 전 알림",
  },
};

export default NOTIFICATION_CONSTANTS;
