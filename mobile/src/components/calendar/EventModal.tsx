import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import CALENDAR_CONSTANTS from "../../constants/calendar";
import { CalendarEvent, CreateEventRequest } from "../../types/calendar";
import {
  formatEventDateTime,
  formatEndDateTime,
} from "../../utils/calendar/dateFormatter";
import {
  validateEventTime,
  validateEventTitle,
} from "../../utils/calendar/eventValidator";

interface EventModalProps {
  visible: boolean;
  selectedDate: string;
  event?: CalendarEvent | null;
  onClose: () => void;
  onSave: (eventId: string | null, eventData: CreateEventRequest) => void;
}

const EventModal = ({
  visible,
  selectedDate,
  event,
  onClose,
  onSave,
}: EventModalProps) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const isEditMode = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setIsAllDay(event.isAllDay);
      setLocation(event.location || "");
      setDescription(event.description || "");
    } else {
      setTitle("");
      setStartTime("");
      setEndTime("");
      setIsAllDay(false);
      setLocation("");
      setDescription("");
    }
  }, [event, visible]);

  const handleSave = () => {
    if (!validateEventTitle(title)) {
      Alert.alert(
        CALENDAR_CONSTANTS.FORM.ALERT_TITLES.INPUT_ERROR,
        CALENDAR_CONSTANTS.FORM.VALIDATION.TITLE_REQUIRED
      );
      return;
    }

    const startDateTime = formatEventDateTime(
      selectedDate,
      startTime,
      isAllDay
    );
    const endDateTime = formatEndDateTime(selectedDate, endTime, isAllDay);

    if (!validateEventTime(startDateTime, endDateTime)) {
      Alert.alert(
        CALENDAR_CONSTANTS.FORM.ALERT_TITLES.TIME_ERROR,
        CALENDAR_CONSTANTS.FORM.VALIDATION.TIME_INVALID
      );
      return;
    }

    const eventData: CreateEventRequest = {
      title: title.trim(),
      startTime: startDateTime,
      endTime: endDateTime,
      location: location.trim() || undefined,
      description: description.trim() || undefined,
      isAllDay,
    };

    onSave(event?.id || null, eventData);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setStartTime("");
    setEndTime("");
    setIsAllDay(false);
    setLocation("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl h-[80%]">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-[20px] font-bold text-center">
              {isEditMode
                ? CALENDAR_CONSTANTS.FORM.EDIT_MODAL_TITLE
                : CALENDAR_CONSTANTS.FORM.MODAL_TITLE}
            </Text>
          </View>

          <ScrollView
            className="flex-1 p-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-4">
              <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                {CALENDAR_CONSTANTS.FORM.LABELS.TITLE}
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-[15px]"
                placeholder={CALENDAR_CONSTANTS.FORM.PLACEHOLDERS.TITLE}
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-[15px] font-semibold text-gray-700">
                {CALENDAR_CONSTANTS.FORM.LABELS.ALL_DAY}
              </Text>
              <Switch
                value={isAllDay}
                onValueChange={setIsAllDay}
                trackColor={{
                  false: CALENDAR_CONSTANTS.THEME.COLORS.SWITCH_TRACK_FALSE,
                  true: CALENDAR_CONSTANTS.THEME.COLORS.SWITCH_TRACK_TRUE,
                }}
                thumbColor={CALENDAR_CONSTANTS.THEME.COLORS.SWITCH_THUMB}
              />
            </View>

            {!isAllDay && (
              <>
                <View className="mb-4">
                  <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                    {CALENDAR_CONSTANTS.FORM.LABELS.START_TIME}
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-[15px]"
                    placeholder="2025-10-06T09:00:00+09:00"
                    value={startTime}
                    onChangeText={setStartTime}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                    {CALENDAR_CONSTANTS.FORM.LABELS.END_TIME}
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-[15px]"
                    placeholder="2025-10-06T10:00:00+09:00"
                    value={endTime}
                    onChangeText={setEndTime}
                  />
                </View>
              </>
            )}

            <View className="mb-4">
              <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                {CALENDAR_CONSTANTS.FORM.LABELS.LOCATION}
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-[15px]"
                placeholder={CALENDAR_CONSTANTS.FORM.PLACEHOLDERS.LOCATION}
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <View className="mb-20">
              <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                {CALENDAR_CONSTANTS.FORM.LABELS.DESCRIPTION}
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-[15px]"
                placeholder={CALENDAR_CONSTANTS.FORM.PLACEHOLDERS.DESCRIPTION}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          <View className="flex-row p-4 gap-3 border-t border-gray-200 bg-white">
            <TouchableOpacity
              onPress={handleClose}
              className="flex-1 py-3 rounded-lg bg-gray-200"
              activeOpacity={0.7}
            >
              <Text className="text-center text-[16px] font-semibold text-gray-700">
                {CALENDAR_CONSTANTS.FORM.BUTTONS.CANCEL}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 py-3 rounded-lg bg-blue-500"
              activeOpacity={0.7}
            >
              <Text className="text-center text-[16px] font-semibold text-white">
                {CALENDAR_CONSTANTS.FORM.BUTTONS.SAVE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;
