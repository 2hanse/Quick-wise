import { callGemini } from "./geminiClient";
import parseGeminiJSON from "../../utils/ai/jsonParser";
import { wrapError } from "../../utils/ai/errorHandler";
import AI_CONSTANTS from "../../constants/ai";
import constants from "../../constants/messages";
import { AICardGenerationResult } from "../../types/ai";

const createContentPrompt = (
  category: string,
  eventTitle: string,
  eventDescription: string,
  videoTitle: string,
  speaker: string,
  summary: string
): string => {
  return `당신은 실용적인 자기계발 코치입니다.

[사용자 일정]
카테고리: ${category}
제목: ${eventTitle}
설명: ${eventDescription || "없음"}

[강연 내용]
제목: ${videoTitle}
연사: ${speaker}
요약: ${summary}

위 강연 내용을 바탕으로 사용자의 일정에 도움되는 콘텐츠를 생성하세요.

JSON 형식으로 출력하세요. 코드블록 없이 순수 JSON만:
{
  "tip": "실행 가능한 한 줄 조언 (20자 이내)",
  "scenario": {
    "situation": "발생 가능한 구체적 상황 (50자 이내)",
    "response": "효과적인 대응 방법 (100자 이내)"
  },
  "checklist": {
    "items": ["체크항목1 (동사로 시작)", "체크항목2", "체크항목3"]
  }
}

제약사항:
- 일정과 직접 관련된 내용만
- 구체적이고 실행 가능한 내용
- 추상적이거나 철학적인 내용 제외`;
};

const generateContent = async (
  category: string,
  eventTitle: string,
  eventDescription: string,
  videoTitle: string,
  speaker: string,
  summary: string
): Promise<AICardGenerationResult> => {
  try {
    const prompt = createContentPrompt(
      category,
      eventTitle,
      eventDescription,
      videoTitle,
      speaker,
      summary
    );

    const result = await callGemini(prompt);
    const parsed = parseGeminiJSON<AICardGenerationResult | null>(result.text);

    if (!parsed) {
      throw new Error(constants.ERROR_MESSAGES.GEMINI.INVALID_RESPONSE);
    }

    if (
      parsed.tip &&
      parsed.tip.length > AI_CONSTANTS.CARD_LIMITS.TIP_MAX_LENGTH
    ) {
      parsed.tip = parsed.tip.substring(
        0,
        AI_CONSTANTS.CARD_LIMITS.TIP_MAX_LENGTH
      );
    }

    if (
      parsed.scenario?.situation &&
      parsed.scenario.situation.length >
        AI_CONSTANTS.CARD_LIMITS.SITUATION_MAX_LENGTH
    ) {
      parsed.scenario.situation = parsed.scenario.situation.substring(
        0,
        AI_CONSTANTS.CARD_LIMITS.SITUATION_MAX_LENGTH
      );
    }

    if (
      parsed.scenario?.response &&
      parsed.scenario.response.length >
        AI_CONSTANTS.CARD_LIMITS.RESPONSE_MAX_LENGTH
    ) {
      parsed.scenario.response = parsed.scenario.response.substring(
        0,
        AI_CONSTANTS.CARD_LIMITS.RESPONSE_MAX_LENGTH
      );
    }

    if (
      parsed.checklist?.items &&
      parsed.checklist.items.length >
        AI_CONSTANTS.CARD_LIMITS.CHECKLIST_MAX_ITEMS
    ) {
      parsed.checklist.items = parsed.checklist.items.slice(
        0,
        AI_CONSTANTS.CARD_LIMITS.CHECKLIST_MAX_ITEMS
      );
    }

    return {
      tip: parsed.tip,
      scenario: parsed.scenario,
      checklist: parsed.checklist,
    };
  } catch (error) {
    throw wrapError(error, constants.LOG_PREFIXES.AI_CONTENT);
  }
};

export { generateContent };
