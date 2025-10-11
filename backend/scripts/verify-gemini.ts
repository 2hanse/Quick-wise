import dotenv from "dotenv";
dotenv.config();

import { callGemini } from "../src/services/ai/geminiClient";

async function verifyGemini() {
  console.log("Gemini API 검증 시작\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY가 .env에 설정되지 않았습니다");
    console.log(".env 파일에 GEMINI_API_KEY=your_key 추가하세요");
    process.exit(1);
  }

  try {
    console.log("Gemini API 호출 테스트...");
    const result = await callGemini(
      "안녕하세요. 간단히 인사해주세요. 20자 이내로."
    );

    console.log("✅ API 호출 성공!");
    console.log(`응답: ${result.text}\n`);

    if (result.text.length > 0) {
      console.log("✅ 모든 검증 통과!\n");
    } else {
      console.error("❌ 응답이 비어있습니다");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ 검증 실패:", error);
    process.exit(1);
  }
}

verifyGemini();
