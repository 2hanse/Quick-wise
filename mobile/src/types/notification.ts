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
  isAllDay?: boolean;
}

interface NotificationState {
  scheduledNotifications: Record<string, ScheduledNotification>;
  scheduleNotificationsForEvents: (
    events: NotificationEvent[]
  ) => Promise<void>;
  cancelNotification: (eventId: string) => Promise<void>;
  cancelAllNotifications: () => Promise<void>;
  loadScheduledNotifications: () => Promise<void>;
}

interface UseNotificationListenerProps {
  onNotificationClick: () => void;
}

export {
  NotificationPermissionStatus,
  ScheduledNotification,
  NotificationEvent,
  NotificationState,
  UseNotificationListenerProps,
};
