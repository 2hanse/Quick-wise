import { GoogleGenerativeAI } from "@google/generative-ai";
import { isRateLimitError } from "../../utils/ai/errorHandler";
import constants from "../../constants/messages";
import AI_CONSTANTS from "../../constants/ai";
import { GeminiResponse } from "../../types/ai";

const getApiKey = (): string => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(constants.ERROR_MESSAGES.GEMINI.API_KEY_NOT_DEFINED);
  }
  return apiKey;
};

let genAI: GoogleGenerativeAI | null = null;

const getGenAI = (): GoogleGenerativeAI => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(getApiKey());
  }
  return genAI;
};

const callGemini = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const model = getGenAI().getGenerativeModel({
      model: AI_CONSTANTS.GEMINI.MODEL,
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: AI_CONSTANTS.GEMINI.MAX_TOKENS,
        temperature: AI_CONSTANTS.GEMINI.TEMPERATURE,
      },
    });

    const text = result.response.text();

    if (!text) {
      throw new Error(constants.ERROR_MESSAGES.GEMINI.INVALID_RESPONSE);
    }

    return { text };
  } catch (error) {
    if (isRateLimitError(error)) {
      throw new Error(constants.ERROR_MESSAGES.GEMINI.RATE_LIMIT_EXCEEDED);
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : constants.ERROR_MESSAGES.GEMINI.API_ERROR;

    throw new Error(
      `${constants.ERROR_MESSAGES.GEMINI.API_ERROR}: ${errorMessage}`
    );
  }
};

export { callGemini };
