import apiClient from "../utils/apiClient";
import API_CONSTANTS from "../constants/api";
import {
  TodayAIContentResponse,
  EventAIContentResponse,
  RetryEventRequest,
  RetryEventResponse,
} from "../types/ai";

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

const retryEventAI = async (
  eventId: string,
  request: RetryEventRequest = {}
): Promise<RetryEventResponse> => {
  const response = await apiClient.post<RetryEventResponse>(
    `${API_CONSTANTS.ENDPOINTS.AI.RETRY}/${eventId}/retry`,
    request
  );
  return response.data;
};

export { fetchTodayAIContent, fetchEventAIContent, retryEventAI };
