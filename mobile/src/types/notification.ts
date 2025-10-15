interface NotificationPermissionStatus {
  granted: boolean;
  status: "granted" | "denied" | "undetermined";
}

export { NotificationPermissionStatus };
