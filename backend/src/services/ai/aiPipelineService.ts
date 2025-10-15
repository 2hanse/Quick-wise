import { extractKeywords } from "./keywordExtractor";
import { searchVideos } from "./videoSearcher";
import { fetchTranscripts } from "./transcriptFetcher";
import { summarizeMultipleTranscripts } from "./contentSummarizer";
import { generateContent } from "./contentGenerator";
import { wrapError } from "../../utils/ai/errorHandler";
import constants from "../../constants/messages";
import {
  AIProcessingResult,
  AICard,
  VideoInfo,
  VideoSummary,
  VideoSubtitle,
} from "../../types/ai";

const extractKeywordsForEvent = async (
  title: string,
  description: string,
  category: string
) => {
  try {
    return await extractKeywords(title, description, category);
  } catch (error) {
    throw wrapError(error, constants.LOG_PREFIXES.AI_KEYWORD);
  }
};

const searchYoutubeVideos = async (query: string, excludeIds: string[]) => {
  try {
    const videos = await searchVideos(query, excludeIds);
    if (videos.length === 0) {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_VIDEOS_FOUND),
        constants.LOG_PREFIXES.YOUTUBE_SEARCH
      );
    }
    return videos;
  } catch (error) {
    throw wrapError(error, constants.LOG_PREFIXES.YOUTUBE_SEARCH);
  }
};

const fetchVideoTranscripts = async (videos: VideoInfo[]) => {
  try {
    const transcripts = await fetchTranscripts(videos);
    if (transcripts.length === 0) {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_TRANSCRIPTS_AVAILABLE),
        constants.LOG_PREFIXES.AI_TRANSCRIPT
      );
    }
    return transcripts;
  } catch (error) {
    throw wrapError(error, constants.LOG_PREFIXES.AI_TRANSCRIPT);
  }
};

const summarizeVideoContent = async (
  videos: VideoInfo[],
  transcripts: VideoSubtitle[],
  keywords: string[]
) => {
  try {
    return await summarizeMultipleTranscripts(videos, transcripts, keywords);
  } catch (error) {
    throw wrapError(error, constants.LOG_PREFIXES.AI_SUMMARY);
  }
};

const generateAICards = async (
  summaries: VideoSummary[],
  videos: VideoInfo[],
  category: string,
  title: string,
  description: string
): Promise<AICard[]> => {
  const cards: AICard[] = [];
  let order = 0;

  for (const summary of summaries) {
    const video = videos.find((v) => v.videoId === summary.videoId);
    if (!video) continue;

    const content = await generateContent(
      category,
      title,
      description,
      summary.videoTitle,
      summary.speaker,
      summary.summary
    );

    const source = {
      videoId: video.videoId,
      videoTitle: video.title,
      speaker: summary.speaker,
      videoUrl: summary.videoUrl,
    };

    if (content.tip) {
      cards.push({
        type: "tip",
        content: content.tip,
        source,
        order: order++,
      });
    }

    if (content.scenario) {
      cards.push({
        type: "scenario",
        situation: content.scenario.situation,
        response: content.scenario.response,
        source,
        order: order++,
      });
    }

    if (content.checklist) {
      cards.push({
        type: "checklist",
        items: content.checklist.items,
        source,
        order: order++,
      });
    }
  }

  return cards;
};

const processEventWithAI = async (
  eventTitle: string,
  eventDescription: string,
  category: string,
  excludeVideoIds: string[] = []
): Promise<AIProcessingResult> => {
  try {
    const keywordResult = await extractKeywordsForEvent(
      eventTitle,
      eventDescription,
      category
    );

    const videos = await searchYoutubeVideos(
      keywordResult.searchQuery,
      excludeVideoIds
    );

    const transcripts = await fetchVideoTranscripts(videos);

    const summaries = await summarizeVideoContent(
      videos,
      transcripts,
      keywordResult.keywords
    );

    const cards = await generateAICards(
      summaries,
      videos,
      category,
      eventTitle,
      eventDescription
    );

    return {
      success: true,
      cards,
      keywords: keywordResult.keywords,
      usedVideoIds: videos.map((video) => video.videoId),
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : constants.ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR,
    };
  }
};

export { processEventWithAI };
