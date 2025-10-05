import apiClient from "../utils/apiClient";
import API_CONSTANTS from "../constants/api";
import {
  CalendarEventsResponse,
  CreateEventRequest,
  CreateEventResponse,
} from "../types/calendar";

const fetchCalendarEvents = async (
  startDate: string,
  endDate: string
): Promise<CalendarEventsResponse> => {
  const response = await apiClient.get<CalendarEventsResponse>(
    API_CONSTANTS.ENDPOINTS.CALENDAR.EVENTS,
    {
      params: {
        startDate,
        endDate,
      },
    }
  );

  return response.data;
};

const createCalendarEvent = async (
  eventData: CreateEventRequest
): Promise<CreateEventResponse> => {
  const response = await apiClient.post<CreateEventResponse>(
    API_CONSTANTS.ENDPOINTS.CALENDAR.EVENTS,
    eventData
  );
  return response.data;
};

export { fetchCalendarEvents, createCalendarEvent };
