import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { UseNotificationListenerProps } from "../../types/notification";

const useNotificationListener = ({
  onNotificationClick,
}: UseNotificationListenerProps) => {
  useEffect(() => {
    const receivedListener = Notifications.addNotificationReceivedListener(
      (_notification) => {}
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const eventId = response.notification.request.content.data
          ?.eventId as string;

        if (eventId) {
          onNotificationClick();
        }
      });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, [onNotificationClick]);
};

export default useNotificationListener;
