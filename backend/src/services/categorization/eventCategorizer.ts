import { EventCategory } from "../../types/calendar";
import constants from "../../constants/messages";

const categorizeEvent = (
  title: string,
  description?: string,
  location?: string
): EventCategory | null => {
  const titleText = title.toLowerCase();
  const descriptionText = (description || "").toLowerCase();
  const locationText = (location || "").toLowerCase();
  const combinedText = `${titleText} ${descriptionText} ${locationText}`;

  if (
    constants.EVENT_CATEGORY.MEETING.KEYWORDS.some((keyword) =>
      combinedText.includes(keyword.toLowerCase())
    )
  ) {
    return constants.EVENT_CATEGORY.MEETING.VALUE as EventCategory;
  }
  if (
    constants.EVENT_CATEGORY.PRESENTATION.KEYWORDS.some((keyword) =>
      combinedText.includes(keyword.toLowerCase())
    )
  ) {
    return constants.EVENT_CATEGORY.PRESENTATION.VALUE as EventCategory;
  }
  return null;
};

export default categorizeEvent;
