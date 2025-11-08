import { NativeModule, requireNativeModule } from "expo";

declare class NotificationSchedulerModule extends NativeModule {
  scheduleNotification(
    eventId: string,
    timestamp: number,
    title: string,
    body: string
  ): Promise<string>;

  cancelNotification(eventId: string): Promise<string>;

  cancelAllNotifications(): Promise<string>;
}

export default requireNativeModule<NotificationSchedulerModule>(
  "NotificationScheduler"
);
