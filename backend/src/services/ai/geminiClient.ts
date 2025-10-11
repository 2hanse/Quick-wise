import { GoogleGenerativeAI } from "@google/generative-ai";
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

const genAI = new GoogleGenerativeAI(getApiKey());

const isRateLimitError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return message.includes("quota") || message.includes("limit");
};

const callGemini = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const model = genAI.getGenerativeModel({
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
