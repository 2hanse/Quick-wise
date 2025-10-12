import { AICard } from "../../types/ai";
import { SwipeContent } from "../../types/main";

const convertAICardsToSwipeContents = (cards: AICard[]): SwipeContent[] => {
  return cards.map((card) => {
    const baseContent: SwipeContent = {
      id: `${card.type}-${card.order}`,
      type: card.type,
      source: card.source,
      order: card.order,
    };

    switch (card.type) {
      case "tip":
        return {
          ...baseContent,
          content: card.content,
        };
      case "scenario":
        return {
          ...baseContent,
          situation: card.situation,
          response: card.response,
        };
      case "checklist":
        return {
          ...baseContent,
          items: card.items,
        };
      default:
        return baseContent;
    }
  });
};

export { convertAICardsToSwipeContents };
