import TIME_CONSTANTS from "../constants/time";

const getTodayDateRange = (): { startDate: string; endDate: string } => {
  const now = new Date();
  const kstNow = new Date(now.getTime() + TIME_CONSTANTS.KST.OFFSET_MS);

  const kstStartOfDay = new Date(kstNow);
  kstStartOfDay.setUTCHours(
    TIME_CONSTANTS.DAY.START.HOURS,
    TIME_CONSTANTS.DAY.START.MINUTES,
    TIME_CONSTANTS.DAY.START.SECONDS,
    TIME_CONSTANTS.DAY.START.MILLISECONDS
  );

  const utcStartOfDay = new Date(
    kstStartOfDay.getTime() - TIME_CONSTANTS.KST.OFFSET_MS
  );

  const kstEndOfDay = new Date(kstNow);
  kstEndOfDay.setUTCHours(
    TIME_CONSTANTS.DAY.END.HOURS,
    TIME_CONSTANTS.DAY.END.MINUTES,
    TIME_CONSTANTS.DAY.END.SECONDS,
    TIME_CONSTANTS.DAY.END.MILLISECONDS
  );

  const utcEndOfDay = new Date(
    kstEndOfDay.getTime() - TIME_CONSTANTS.KST.OFFSET_MS
  );

  return {
    startDate: utcStartOfDay.toISOString(),
    endDate: utcEndOfDay.toISOString(),
  };
};

export { getTodayDateRange };
