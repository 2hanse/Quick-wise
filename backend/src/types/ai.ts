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
  thumbnail: string;
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
    thumbnails: {
      high: {
        url: string;
      };
    };
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
  thumbnail: string;
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
};
