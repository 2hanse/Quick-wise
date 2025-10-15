import constants from "../../constants/messages";
import PARSING_CONSTANTS from "../../constants/parsing";

const parseGeminiJSON = <T>(text: string): T | null => {
  let jsonText = text.trim();

  if (jsonText.startsWith("```json")) {
    jsonText = jsonText
      .replace(PARSING_CONSTANTS.MARKDOWN.JSON_BLOCK, "")
      .replace(PARSING_CONSTANTS.MARKDOWN.CODE_BLOCK, "");
  }

  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(PARSING_CONSTANTS.MARKDOWN.CODE_BLOCK, "");
  }

  try {
    return JSON.parse(jsonText) as T;
  } catch (error) {
    console.error(
      `${constants.LOG_PREFIXES.GEMINI_API} ${constants.ERROR_MESSAGES.GEMINI.PARSE_FAILED}`,
      error
    );
    return null;
  }
};

export default parseGeminiJSON;
