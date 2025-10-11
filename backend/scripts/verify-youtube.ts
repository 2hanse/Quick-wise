import dotenv from "dotenv";
dotenv.config();

import { extractKeywords } from "../src/services/ai/keywordExtractor";
import { searchVideos } from "../src/services/ai/videoSearcher";

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

    console.log("✅ 모든 검증 통과!\n");
  } catch (error) {
    console.error("❌ 검증 실패:", error);
    process.exit(1);
  }
}

verifyYouTube();
