import { YoutubeTranscript } from "@danielxceron/youtube-transcript";
import constants from "../../constants/messages";
import { VideoSubtitle, VideoInfo } from "../../types/ai";

const fetchTranscript = async (
  videoId: string
): Promise<VideoSubtitle | null> => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "ko",
    });

    if (!transcript || transcript.length === 0) {
      console.error(
        `${constants.LOG_PREFIXES.YOUTUBE_SEARCH} 자막 없음 (${videoId}): 빈 자막`
      );
      return null;
    }

    const lines = transcript.map((segment) => ({
      text: segment.text,
      start: segment.offset / 1000,
      duration: segment.duration / 1000,
    }));

    const fullText = lines.map((line) => line.text).join(" ");

    return {
      videoId,
      lines,
      fullText,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      `${constants.LOG_PREFIXES.YOUTUBE_SEARCH} 한국어 자막 없음 (${videoId}): ${errorMessage}`
    );
    return null;
  }
};

const fetchTranscripts = async (
  videos: VideoInfo[]
): Promise<VideoSubtitle[]> => {
  try {
    const transcriptPromises = videos.map((video) =>
      fetchTranscript(video.videoId)
    );

    const results = await Promise.all(transcriptPromises);

    const validTranscripts = results.filter(
      (transcript): transcript is VideoSubtitle => transcript !== null
    );

    if (validTranscripts.length === 0) {
      throw new Error(constants.ERROR_MESSAGES.YOUTUBE.NO_TRANSCRIPT);
    }

    return validTranscripts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `${constants.ERROR_MESSAGES.YOUTUBE.TRANSCRIPT_FETCH_FAILED}: ${error.message}`
      );
    }
    throw error;
  }
};

export { fetchTranscripts };
