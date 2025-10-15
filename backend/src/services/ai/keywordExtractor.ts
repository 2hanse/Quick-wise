import { callGemini } from "./geminiClient";
import parseGeminiJSON from "../../utils/ai/jsonParser";
import { wrapError } from "../../utils/ai/errorHandler";
import constants from "../../constants/messages";
import { KeywordExtractionResult, GeminiKeywordResponse } from "../../types/ai";

const extractKeywords = async (
  eventTitle: string,
  eventDescription: string,
  category: string
): Promise<KeywordExtractionResult> => {
  const categoryContext: Record<string, string> = {
    meeting: "회의, 소통, 협업, 리더십",
    presentation: "발표, 프레젠테이션, 스피치, 설득",
  };

  const contextKeywords = categoryContext[category] || "자기계발, 성장, 실용";

  const prompt = `당신은 YouTube 검색어 생성 전문가입니다.

일정 정보:
- 제목: ${eventTitle}
- 카테고리: ${category}
- 설명: ${eventDescription || "없음"}

위 일정에 참석하는 사람에게 도움이 될 만한 세바시 강연을 찾기 위한 YouTube 검색어를 생성하세요.

중요: 세바시는 특정 채널이므로 너무 구체적인 검색어는 결과가 없을 수 있습니다.

검색어 생성 규칙:
1. **1-2개의 핵심 단어만 사용** (예: "발표", "프레젠테이션", "스피치")
2. 일반적이고 보편적인 주제어 사용 (❌ "신제품 런칭 발표 스킬" ✅ "발표")
3. 카테고리 관련 키워드 참고: ${contextKeywords}
4. 검색어는 짧고 간단할수록 좋음

JSON 형식으로 출력하세요. 코드블록 없이 순수 JSON만 반환:
{
  "searchQuery": "1-2개 단어로 된 간단한 검색어",
  "keywords": ["키워드1", "키워드2", "키워드3"]
}

예시:
- 일정: "클라이언트 프레젠테이션" → searchQuery: "발표"
- 일정: "팀 회의" → searchQuery: "회의"
- 일정: "면접 준비" → searchQuery: "면접"
- 일정: "영어 스터디" → searchQuery: "학습"

keywords는 나중에 자막에서 핵심 내용을 찾는데 사용되므로, 일정과 관련된 구체적인 키워드를 포함하세요.`;

  try {
    const result = await callGemini(prompt);
    const parsed = parseGeminiJSON<GeminiKeywordResponse>(result.text);

    if (!parsed || !parsed.searchQuery || !parsed.keywords) {
      throw new Error(constants.ERROR_MESSAGES.GEMINI.INVALID_RESPONSE);
    }

    const searchWords = parsed.searchQuery.split(" ");
    const simplifiedQuery = searchWords.slice(0, 2).join(" ");

    return {
      searchQuery: simplifiedQuery,
      keywords: parsed.keywords,
    };
  } catch (error) {
    throw wrapError(error, constants.LOG_PREFIXES.AI_KEYWORD);
  }
};

export { extractKeywords };
