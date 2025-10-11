import dotenv from "dotenv";
dotenv.config();

import { processEventWithAI } from "../src/services/ai/aiPipeline";

async function verifyAIPipeline() {
  console.log("AI 파이프라인 전체 검증 시작\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY가 .env에 설정되지 않았습니다");
    process.exit(1);
  }

  if (!process.env.YOUTUBE_API_KEY) {
    console.error("❌ YOUTUBE_API_KEY가 .env에 설정되지 않았습니다");
    process.exit(1);
  }

  try {
    console.log("테스트 일정 정보:");
    console.log("제목: 클라이언트 프레젠테이션");
    console.log("설명: 신제품 런칭 발표 및 Q&A");
    console.log("카테고리: presentation\n");

    console.log("AI 파이프라인 실행 중...\n");

    const result = await processEventWithAI(
      "클라이언트 프레젠테이션",
      "신제품 런칭 발표 및 Q&A",
      "presentation"
    );

    if (!result.success) {
      console.error("❌ 파이프라인 실패:", result.error);
      process.exit(1);
    }

    console.log("✅ 파이프라인 성공!\n");

    console.log("=== 생성된 AI 카드 ===\n");
    console.log(`총 ${result.cards?.length}개 카드 생성\n`);

    result.cards?.forEach((card, index) => {
      console.log(`${index + 1}. [${card.type.toUpperCase()}]`);

      if (card.type === "tip") {
        console.log(`   💡 ${card.content}`);
      } else if (card.type === "scenario") {
        console.log(`   📋 상황: ${card.situation}`);
        console.log(`   💬 대응: ${card.response}`);
      } else if (card.type === "checklist") {
        console.log(`   ✅ 체크리스트:`);
        card.items?.forEach((item, i) => {
          console.log(`      ${i + 1}. ${item}`);
        });
      }

      console.log(`   📺 출처: ${card.source.videoTitle}`);
      console.log(`   🎤 연사: ${card.source.speaker}`);
      console.log(`   🔗 ${card.source.videoUrl}\n`);
    });

    console.log("=== 추출된 키워드 ===");
    console.log(result.keywords?.join(", ") + "\n");

    console.log("=== 사용된 비디오 ID ===");
    console.log(result.usedVideoIds?.join(", ") + "\n");

    console.log("✅ 모든 검증 통과!\n");
  } catch (error) {
    console.error("❌ 검증 실패:", error);
    process.exit(1);
  }
}

verifyAIPipeline();
