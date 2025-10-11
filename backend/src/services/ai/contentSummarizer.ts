import { callGemini } from "./geminiClient";
import constants from "../../constants/messages";
import AI_CONSTANTS from "../../constants/ai";
import { VideoSubtitle, VideoInfo, VideoSummary } from "../../types/ai";

const createSummaryPrompt = (
  videoTitle: string,
  keywords: string[],
  transcript: string
): string => {
  return `다음은 세바시 강연 스크립트입니다.

제목: ${videoTitle}
관련 키워드: ${keywords.join(", ")}

스크립트:
${transcript}

이 강연에서 "${keywords.join(", ")}"와 관련된 핵심 내용만 추출하여 500-800자로 요약하세요.

요구사항:
- 실용적인 조언 위주
- 구체적인 방법론 포함
- 추상적인 이야기는 제외
- 한국어로 작성

요약문만 출력하세요.`;
};

const summarizeTranscript = async (
  video: VideoInfo,
  transcript: VideoSubtitle,
  keywords: string[]
): Promise<VideoSummary> => {
  try {
    let transcriptText = transcript.fullText;

    if (transcriptText.length > AI_CONSTANTS.PROCESSING.TRANSCRIPT_MAX_LENGTH) {
      transcriptText = transcriptText.substring(
        0,
        AI_CONSTANTS.PROCESSING.TRANSCRIPT_MAX_LENGTH
      );
    }

    const prompt = createSummaryPrompt(video.title, keywords, transcriptText);

    const result = await callGemini(prompt);
    const summary = result.text.trim();

    if (summary.length < AI_CONSTANTS.PROCESSING.SUMMARY_MIN_LENGTH) {
      throw new Error("요약이 너무 짧습니다");
    }

    return {
      videoId: video.videoId,
      videoTitle: video.title,
      speaker: video.channelTitle,
      summary,
      videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
      thumbnail: video.thumbnail,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `${constants.ERROR_MESSAGES.GEMINI.GENERATION_FAILED}: ${error.message}`
      );
    }
    throw error;
  }
};

const summarizeMultipleTranscripts = async (
  videos: VideoInfo[],
  transcripts: VideoSubtitle[],
  keywords: string[]
): Promise<VideoSummary[]> => {
  const summaryPromises = transcripts.map((transcript) => {
    const video = videos.find((v) => v.videoId === transcript.videoId);
    if (!video) return null;
    return summarizeTranscript(video, transcript, keywords);
  });

  const results = await Promise.all(summaryPromises);

  return results.filter((summary): summary is VideoSummary => summary !== null);
};

export { summarizeMultipleTranscripts };
