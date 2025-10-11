import dotenv from "dotenv";
dotenv.config();

import { extractKeywords } from "../src/services/ai/keywordExtractor";
import { searchVideos } from "../src/services/ai/videoSearcher";
import { fetchTranscripts } from "../src/services/ai/transcriptFetcher";

async function verifyYouTube() {
  console.log("YouTube 검색 시스템 검증 시작\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY가 .env에 설정되지 않았습니다");
    process.exit(1);
  }

  if (!process.env.YOUTUBE_API_KEY) {
    console.error("❌ YOUTUBE_API_KEY가 .env에 설정되지 않았습니다");
    process.exit(1);
  }

  try {
    console.log("1. AI 검색어 생성 테스트...");
    const keywordResult = await extractKeywords(
      "팀 회의 - 마케팅 전략 논의",
      "Q4 마케팅 전략 수립 및 예산 논의",
      "meeting"
    );

    console.log("✅ 검색어 생성 성공!");
    console.log(`생성된 검색어: ${keywordResult.searchQuery}`);
    console.log(`키워드: ${keywordResult.keywords.join(", ")}\n`);

    console.log("2. YouTube 영상 검색 테스트...");
    const videos = await searchVideos(keywordResult.searchQuery);

    console.log(`✅ 검색 성공! ${videos.length}개 영상 발견\n`);

    videos.forEach((video, index) => {
      console.log(`${index + 1}. ${video.title}`);
      console.log(`   채널: ${video.channelTitle}`);
      console.log(`   영상 ID: ${video.videoId}\n`);
    });

    console.log("3. 영상 자막 가져오기 테스트...");
    const transcripts = await fetchTranscripts(videos);

    console.log(
      `✅ 자막 추출 성공! ${transcripts.length}개 영상의 자막 확보\n`
    );

    transcripts.forEach((transcript, index) => {
      console.log(`${index + 1}. 영상 ID: ${transcript.videoId}`);
      console.log(`   자막 줄 수: ${transcript.lines.length}줄`);
      console.log(`   전체 텍스트 길이: ${transcript.fullText.length}자`);

      if (transcript.lines.length === 0) {
        console.log(`   ⚠️ 경고: 자막이 비어있습니다!`);
      } else {
        console.log(
          `   미리보기: ${transcript.fullText.substring(0, 100)}...\n`
        );
      }
    });

    if (transcripts.some((t) => t.lines.length === 0)) {
      console.error("\n❌ 일부 영상의 자막이 비어있습니다!");
      process.exit(1);
    }

    console.log("✅ 모든 검증 통과!\n");
  } catch (error) {
    console.error("❌ 검증 실패:", error);
    process.exit(1);
  }
}

verifyYouTube();
