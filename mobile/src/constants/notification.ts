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
  MILLISECONDS: {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
  },
  MESSAGE: {
    TITLE_PREFIX: "10분 후 ",
    BODY: "알림을 클릭하여 확인하세요",
  },
  ERROR: {
    PERMISSION_FAILED: "Failed to request notification permission",
    CHANNEL_CREATION_FAILED: "Failed to create notification channel",
    SCHEDULE_FAILED: "Failed to schedule notification",
    CANCEL_FAILED: "Failed to cancel notification",
    MODULE_NOT_AVAILABLE: "NotificationScheduler module not available",
    SCHEDULE_EVENT_FAILED: "Failed to schedule notification for event",
    CLEAR_ALL_FAILED: "Failed to clear all notifications",
  },
  SETTING: {
    TITLE: "알림 설정",
    DESCRIPTION: "일정 10분 전 알림",
  },
};

export default NOTIFICATION_CONSTANTS;
