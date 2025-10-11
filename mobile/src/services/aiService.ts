import apiClient from "../utils/apiClient";
import API_CONSTANTS from "../constants/api";
import { TodayAIContentResponse, EventAIContentResponse } from "../types/ai";

const fetchTodayAIContent = async (): Promise<TodayAIContentResponse> => {
  const response = await apiClient.get<TodayAIContentResponse>(
    API_CONSTANTS.ENDPOINTS.AI.TODAY
  );
  return response.data;
};

const fetchEventAIContent = async (
  eventId: string
): Promise<EventAIContentResponse> => {
  const response = await apiClient.get<EventAIContentResponse>(
    `${API_CONSTANTS.ENDPOINTS.AI.EVENT}/${eventId}`
  );
  return response.data;
};

export { fetchTodayAIContent, fetchEventAIContent };
