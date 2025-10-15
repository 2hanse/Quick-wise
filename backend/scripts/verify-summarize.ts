import dotenv from "dotenv";
dotenv.config();

import { searchVideos } from "../src/services/ai/videoSearcher";
import { fetchTranscripts } from "../src/services/ai/transcriptFetcher";
import { summarizeMultipleTranscripts } from "../src/services/ai/contentSummarizer";

async function testSummarize() {
  try {
    console.log("1️⃣ 영상 검색...");
    const videos = await searchVideos("프레젠테이션 스킬");
    console.log(`✅ ${videos.length}개 영상 찾음`);
    videos.forEach((v, i) => {
      console.log(`  ${i + 1}. ${v.title} (${v.videoId})`);
    });
    console.log();

    console.log("2️⃣ 자막 추출...");
    const transcripts = await fetchTranscripts(videos);
    console.log(`✅ ${transcripts.length}개 자막 추출됨`);
    transcripts.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.videoId} - ${t.lines.length}줄`);
    });
    console.log();

    console.log("3️⃣ 요약 시작...");
    const summaries = await summarizeMultipleTranscripts(videos, transcripts, [
      "프레젠테이션",
      "발표",
      "커뮤니케이션",
    ]);
    console.log(`✅ ${summaries.length}개 요약 완료\n`);

    summaries.forEach((s, i) => {
      console.log(`${i + 1}. ${s.videoTitle}`);
      console.log(`   연사: ${s.speaker}`);
      console.log(`   요약 길이: ${s.summary.length}자`);
      console.log(`   미리보기: ${s.summary.substring(0, 80)}...\n`);
    });
  } catch (error) {
    console.error("❌ 에러:", error);
    if (error instanceof Error) {
      console.error("상세:", error.message);
      console.error("스택:", error.stack);
    }
  }
}

testSummarize();
