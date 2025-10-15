import constants from "../../constants/messages";
import AI_CONSTANTS from "../../constants/ai";
import { SupportedCategory } from "../../types/ai";

const normalizeCategory = (category: string): string | null => {
  const normalized = category.toLowerCase().trim();

  if (
    AI_CONSTANTS.SUPPORTED_CATEGORIES.includes(normalized as SupportedCategory)
  ) {
    return normalized;
  }

  const categoryMap = constants.EVENT_CATEGORY;
  const categoryEntry = Object.values(categoryMap).find((entry) =>
    entry.KEYWORDS.some((keyword) => normalized.includes(keyword.toLowerCase()))
  );
  return categoryEntry?.VALUE || null;
};

const determineErrorType = (errorMessage: string): string => {
  const lowerMessage = (errorMessage || "").toLowerCase();

  if (
    AI_CONSTANTS.ERROR_KEYWORDS.QUOTA.some((keyword) =>
      lowerMessage.includes(keyword)
    )
  ) {
    return AI_CONSTANTS.ERROR_TYPES.QUOTA_EXCEEDED;
  }

  if (
    AI_CONSTANTS.ERROR_KEYWORDS.UNSUPPORTED_CATEGORY.some((keyword) =>
      lowerMessage.includes(keyword)
    )
  ) {
    return AI_CONSTANTS.ERROR_TYPES.UNSUPPORTED_CATEGORY;
  }
  return AI_CONSTANTS.ERROR_TYPES.TEMPORARY_ERROR;
};

export { normalizeCategory, determineErrorType };
