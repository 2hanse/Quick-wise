import { useState } from "react";
import Toast from "react-native-toast-message";
import useCalendarStore from "../../stores/calendarStore";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import { CalendarEvent, CreateEventRequest } from "../../types/calendar";

const useEventModal = () => {
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const { createEvent, updateEvent, deleteEvent } = useCalendarStore();

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsAddEventModalVisible(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsAddEventModalVisible(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
    Toast.show({
      type: CALENDAR_CONSTANTS.TOAST.TYPES.SUCCESS,
      text1: CALENDAR_CONSTANTS.MESSAGES.EVENT_DELETED,
      position: CALENDAR_CONSTANTS.TOAST.POSITION.BOTTOM,
      visibilityTime: CALENDAR_CONSTANTS.TOAST.SETTINGS.VISIBILITY_TIME,
      bottomOffset: CALENDAR_CONSTANTS.TOAST.SETTINGS.BOTTOM_OFFSET,
    });
  };

  const handleCloseModal = () => {
    setIsAddEventModalVisible(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (
    eventId: string | null,
    eventData: CreateEventRequest
  ) => {
    if (eventId) {
      await updateEvent(eventId, eventData);
    } else {
      await createEvent(eventData);
    }
  };

  return {
    isAddEventModalVisible,
    selectedEvent,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleCloseModal,
    handleSaveEvent,
  };
};

export default useEventModal;
