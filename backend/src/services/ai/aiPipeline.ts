import { extractKeywords } from "./keywordExtractor";
import { searchVideos } from "./videoSearcher";
import { fetchTranscripts } from "./transcriptFetcher";
import { summarizeMultipleTranscripts } from "./contentSummarizer";
import { generateContent } from "./contentGenerator";
import { wrapError } from "../../utils/ai/errorHandler";
import constants from "../../constants/messages";
import { AIProcessingResult, AICard } from "../../types/ai";

const processEventWithAI = async (
  eventTitle: string,
  eventDescription: string,
  category: string,
  excludeVideoIds: string[] = []
): Promise<AIProcessingResult> => {
  try {
    const keywordResult = await extractKeywords(
      eventTitle,
      eventDescription,
      category
    );

    const videos = await searchVideos(
      keywordResult.searchQuery,
      excludeVideoIds
    );

    if (videos.length === 0) {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_VIDEOS_FOUND),
        constants.LOG_PREFIXES.YOUTUBE_SEARCH
      );
    }

    const transcripts = await fetchTranscripts(videos);

    if (transcripts.length === 0) {
      throw wrapError(
        new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_TRANSCRIPTS_AVAILABLE),
        constants.LOG_PREFIXES.AI_TRANSCRIPT
      );
    }

    const summaries = await summarizeMultipleTranscripts(
      videos,
      transcripts,
      keywordResult.keywords
    );

    const cards: AICard[] = [];
    let order = 0;

    for (const summary of summaries) {
      const video = videos.find((video) => video.videoId === summary.videoId);
      if (!video) continue;

      const content = await generateContent(
        category,
        eventTitle,
        eventDescription,
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
