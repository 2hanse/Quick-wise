const TIME_CONSTANTS = {
  KST: {
    OFFSET_MS: 9 * 60 * 60 * 1000,
  },
  DAY: {
    START: {
      HOURS: 0,
      MINUTES: 0,
      SECONDS: 0,
      MILLISECONDS: 0,
    } as const,
    END: {
      HOURS: 23,
      MINUTES: 59,
      SECONDS: 59,
      MILLISECONDS: 999,
    } as const,
  },
} as const;

export default TIME_CONSTANTS;
