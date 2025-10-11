import { callGemini } from "./geminiClient";
import constants from "../../constants/messages";
import { KeywordExtractionResult } from "../../types/ai";

const extractKeywords = async (
  eventTitle: string,
  eventDescription: string,
  category: string
): Promise<KeywordExtractionResult> => {
  const categoryContext: Record<string, string> = {
    meeting: "회의를 효과적으로 진행하는 방법",
    presentation: "발표를 성공적으로 하는 방법",
  };

  const context =
    categoryContext[category] || "일정에 도움이 되는 실용적인 방법";

  const prompt = `당신은 YouTube 검색어 생성 전문가입니다.

일정 정보:
- 제목: ${eventTitle}
- 카테고리: ${category}
- 설명: ${eventDescription || "없음"}

위 일정에 참석하는 사람에게 도움이 될 만한 세바시 강연을 찾기 위한 YouTube 검색어를 생성하세요.

컨텍스트: ${context}

요구사항:
1. 너무 일반적인 단어는 피하기 ("회의" 대신 "효과적인 회의 방법")
2. 실용적이고 구체적인 표현 사용
3. 2-4개 단어로 구성 (핵심만 간결하게)
4. 한국어로 작성
5. 일정 내용과 직접 관련된 주제

JSON 형식으로 출력하세요. 코드블록 없이 순수 JSON만 반환:
{
  "searchQuery": "YouTube 검색에 사용할 구체적인 검색어",
  "keywords": ["키워드1", "키워드2", "키워드3"]
}

keywords는 나중에 자막에서 핵심 내용을 찾는데 사용됩니다.`;

  try {
    const result = await callGemini(prompt);

    let jsonText = result.text.trim();

    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    }

    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(jsonText);

    if (!parsed.searchQuery || !parsed.keywords) {
      throw new Error(constants.ERROR_MESSAGES.GEMINI.INVALID_RESPONSE);
    }

    return {
      searchQuery: parsed.searchQuery,
      keywords: parsed.keywords,
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

export { extractKeywords };
