import { AICard } from "../models/Event";

interface GeminiResponse {
  text: string;
}

interface KeywordExtractionResult {
  searchQuery: string;
  keywords: string[];
}

interface VideoInfo {
  videoId: string;
  title: string;
  channelTitle: string;
  duration: string;
  publishedAt: string;
  matchScore: number;
}

interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

interface YouTubeVideoDetail {
  id: string;
  contentDetails: {
    duration: string;
  };
}

interface YouTubeVideoDetailsResponse {
  items: YouTubeVideoDetail[];
}

interface SubtitleLine {
  text: string;
  start: number;
  duration: number;
}

interface VideoSubtitle {
  videoId: string;
  lines: SubtitleLine[];
  fullText: string;
}

interface VideoSummary {
  videoId: string;
  videoTitle: string;
  speaker: string;
  summary: string;
  videoUrl: string;
}

interface AICardGenerationResult {
  tip?: string;
  scenario?: {
    situation: string;
    response: string;
  };
  checklist?: {
    items: string[];
  };
}

interface AIProcessingResult {
  success: boolean;
  cards?: AICard[];
  keywords?: string[];
  usedVideoIds?: string[];
  error?: string;
}

export {
  GeminiResponse,
  KeywordExtractionResult,
  VideoInfo,
  YouTubeSearchItem,
  YouTubeSearchResponse,
  YouTubeVideoDetail,
  YouTubeVideoDetailsResponse,
  SubtitleLine,
  VideoSubtitle,
  VideoSummary,
  AICardGenerationResult,
  AIProcessingResult,
  AICard,
};
