import mainPageConstants from "../../constants/main";

const calculateRemainingMinutes = (eventTime: string): number => {
  const now = new Date();
  const eventDate = new Date(eventTime);
  const diffMs = eventDate.getTime() - now.getTime();
  const diffMinutes = Math.floor(
    diffMs / mainPageConstants.TIME_CONVERSION.MILLISECONDS_TO_MINUTES
  );

  return Math.max(mainPageConstants.TIMER.PERCENTAGE.MIN, diffMinutes);
};

const getTimerPercentage = (remainingMinutes: number): number => {
  const cappedMinutes = Math.min(
    remainingMinutes,
    mainPageConstants.TIMER.MAX_MINUTES
  );
  return (
    (cappedMinutes / mainPageConstants.TIMER.MAX_MINUTES) *
    mainPageConstants.TIMER.PERCENTAGE.MAX
  );
};

const getTimerColor = (remainingMinutes: number): string => {
  if (remainingMinutes >= mainPageConstants.TIMER.THRESHOLDS.GREEN_MINUTES) {
    return mainPageConstants.TIMER.COLORS.GREEN;
  }

  if (remainingMinutes >= mainPageConstants.TIMER.THRESHOLDS.ORANGE_MINUTES) {
    return mainPageConstants.TIMER.COLORS.ORANGE;
  }
  return mainPageConstants.TIMER.COLORS.RED;
};

const formatTimerDisplay = (remainingMinutes: number): string => {
  const hours = Math.floor(
    remainingMinutes / mainPageConstants.TIME_CONVERSION.MINUTES_PER_HOUR
  );
  const minutes =
    remainingMinutes % mainPageConstants.TIME_CONVERSION.MINUTES_PER_HOUR;

  if (hours === mainPageConstants.TIMER.PERCENTAGE.MIN) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};

export {
  calculateRemainingMinutes,
  getTimerPercentage,
  getTimerColor,
  formatTimerDisplay,
};
