import apiClient from "../utils/apiClient";
import API_CONSTANTS from "../constants/api";
import { CalendarEventsResponse } from "../types/calendar";

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

export default fetchCalendarEvents;
