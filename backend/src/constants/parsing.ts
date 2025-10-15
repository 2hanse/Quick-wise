const PARSING_CONSTANTS = {
  MARKDOWN: {
    JSON_BLOCK: /```json\n?/g,
    CODE_BLOCK: /```\n?/g,
  },
  YOUTUBE: {
    DURATION_REGEX: /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/,
  },
} as const;

export default PARSING_CONSTANTS;
