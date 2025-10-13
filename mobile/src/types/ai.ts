type AICardType = "tip" | "scenario" | "checklist";

type AIProcessingStatus = "pending" | "processing" | "completed" | "failed";

type AICard = AITipCard | AIScenarioCard | AIChecklistCard;

interface AICardSource {
  videoId: string;
  videoTitle: string;
  speaker: string;
  videoUrl: string;
}

interface AITipCard {
  type: "tip";
  content: string;
  source: AICardSource;
  order: number;
}

interface AIScenarioCard {
  type: "scenario";
  situation: string;
  response: string;
  source: AICardSource;
  order: number;
}

interface AIChecklistCard {
  type: "checklist";
  items: string[];
  source: AICardSource;
  order: number;
}

interface AIContent {
  status: AIProcessingStatus;
  cards?: AICard[];
  keywords?: string[];
  usedVideoIds?: string[];
  processedAt?: Date;
  error?: string;
}

interface EventWithAI {
  _id: string;
  googleEventId: string;
  title: string;
  startTime: string;
  endTime: string;
  category?: string;
  aiContent?: AIContent;
}

interface TodayAIContentResponse {
  events: EventWithAI[];
}

interface EventAIContentResponse {
  event: EventWithAI;
}

interface AIState {
  todayEvents: EventWithAI[];
  selectedEvent: EventWithAI | null;
  isLoading: boolean;
  error: string | null;
  fetchTodayAIContent: () => Promise<void>;
  fetchEventAIContent: (eventId: string) => Promise<void>;
  clearSelectedEvent: () => void;
}

export type { AICardType, AIProcessingStatus, AICard };

export {
  AICardSource,
  AITipCard,
  AIScenarioCard,
  AIChecklistCard,
  AIContent,
  EventWithAI,
  TodayAIContentResponse,
  EventAIContentResponse,
  AIState,
};
