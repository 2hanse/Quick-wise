interface NotificationPermissionStatus {
  granted: boolean;
  status: "granted" | "denied" | "undetermined";
}

interface ScheduledNotification {
  eventId: string;
  notificationId: string;
  eventTitle: string;
  scheduledTime: number;
}

interface NotificationEvent {
  id: string;
  title: string;
  startTime: string;
}

interface NotificationState {
  scheduledNotifications: Record<string, ScheduledNotification>;
  scheduleNotificationsForEvents: (
    events: NotificationEvent[]
  ) => Promise<void>;
  cancelNotificationForEvent: (eventId: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
}

export {
  NotificationPermissionStatus,
  ScheduledNotification,
  NotificationEvent,
  NotificationState,
};
