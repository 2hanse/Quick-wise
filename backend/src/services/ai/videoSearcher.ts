import axios from "axios";
import parseDuration from "../../utils/youtube/durationParser";
import { wrapError } from "../../utils/ai/errorHandler";
import constants from "../../constants/messages";
import AI_CONSTANTS from "../../constants/ai";
import {
  VideoInfo,
  YouTubeSearchResponse,
  YouTubeVideoDetailsResponse,
} from "../../types/ai";

const getApiKey = (): string => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error(constants.ERROR_MESSAGES.YOUTUBE.API_KEY_NOT_DEFINED);
  }
  return apiKey;
};

const searchVideos = async (
  searchQuery: string,
  excludeVideoIds: string[] = []
): Promise<VideoInfo[]> => {
  try {
    const apiKey = getApiKey();

    const searchResponse = await axios.get<YouTubeSearchResponse>(
      `${AI_CONSTANTS.YOUTUBE.API_BASE_URL}/search`,
      {
        params: {
          part: "snippet",
          q: searchQuery,
          channelId: AI_CONSTANTS.YOUTUBE.CHANNEL_ID,
          type: AI_CONSTANTS.YOUTUBE.VIDEO_TYPE,
          maxResults: AI_CONSTANTS.YOUTUBE.MAX_RESULTS,
          order: AI_CONSTANTS.YOUTUBE.RELEVANCE_ORDER,
          key: apiKey,
        },
      }
    );

    if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
      throw new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_RESULTS);
    }

    const videoIds = searchResponse.data.items
      .map((item) => item.id.videoId)
      .join(",");

    const detailsResponse = await axios.get<YouTubeVideoDetailsResponse>(
      `${AI_CONSTANTS.YOUTUBE.API_BASE_URL}/videos`,
      {
        params: {
          part: "contentDetails",
          id: videoIds,
          key: apiKey,
        },
      }
    );

    const videos: VideoInfo[] = searchResponse.data.items
      .map((item) => {
        const details = detailsResponse.data.items.find(
          (detail) => detail.id === item.id.videoId
        );

        return {
          videoId: item.id.videoId,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          duration: details?.contentDetails.duration || "PT0S",
          publishedAt: item.snippet.publishedAt,
        };
      })
      .filter((video): video is VideoInfo => video !== null);

    const filteredVideos = videos
      .filter(
        (video) =>
          !excludeVideoIds.includes(video.videoId) &&
          parseDuration(video.duration) >=
            AI_CONSTANTS.YOUTUBE.MIN_DURATION_SECONDS
      )
      .slice(0, AI_CONSTANTS.YOUTUBE.TOP_VIDEOS_COUNT);

    if (filteredVideos.length === 0) {
      throw new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_RESULTS);
    }

    return filteredVideos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw wrapError(
        new Error(
          `${constants.ERROR_MESSAGES.YOUTUBE.API_ERROR}: ${
            error.response?.data?.error?.message || error.message
          }`
        ),
        constants.LOG_PREFIXES.YOUTUBE_SEARCH
      );
    }

    if (error instanceof Error) {
      throw wrapError(error, constants.LOG_PREFIXES.YOUTUBE_SEARCH);
    }

    throw wrapError(
      new Error(constants.ERROR_MESSAGES.YOUTUBE.SEARCH_FAILED),
      constants.LOG_PREFIXES.YOUTUBE_SEARCH
    );
  }
};

export { searchVideos };
