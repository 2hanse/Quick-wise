import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ChecklistContentProps,
  ChecklistContentItem,
} from "../../../types/main";
import SourceInfo from "../../common/SourceInfo";
import { STORAGE_KEYS } from "../../../constants/storage";
import mainPageConstants from "../../../constants/main";

const ChecklistContent = ({ items, source }: ChecklistContentProps) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistContentItem[]>(
    items.map((text, index) => ({
      id: `${source.videoId}-${index}`,
      text,
      completed: false,
    }))
  );

  const storageKey = `${STORAGE_KEYS.CHECKLIST_STATE}_${source.videoId}`;

  useEffect(() => {
    loadChecklistState();
  }, []);

  useEffect(() => {
    saveChecklistState();
  }, [checklistItems]);

  const loadChecklistState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(storageKey);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setChecklistItems(parsedState);
      }
    } catch (error) {
      console.error(
        mainPageConstants.LOG_MESSAGES.CHECKLIST_LOAD_FAILED,
        error
      );
    }
  };

  const saveChecklistState = async () => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(checklistItems));
    } catch (error) {
      console.error(
        mainPageConstants.LOG_MESSAGES.CHECKLIST_SAVE_FAILED,
        error
      );
    }
  };

  const toggleItem = (itemId: string) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <View>
      <View className="gap-3 mb-4">
        {checklistItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggleItem(item.id)}
            className="flex-row items-start gap-3"
          >
            <View
              className={`w-5 h-5 rounded items-center justify-center ${
                item.completed ? "bg-[#10b981]" : "bg-[#e5e7eb]"
              }`}
            >
              {item.completed && (
                <Text className="text-white text-[12px] font-bold">✓</Text>
              )}
            </View>
            <Text
              className={`text-[15px] flex-1 ${
                item.completed
                  ? "text-[#6b7280] line-through"
                  : "text-[#1a1a1a] font-medium"
              }`}
            >
              {item.text}
            </Text>
          </Pressable>
        ))}
      </View>
      <SourceInfo source={source} />
    </View>
  );
};

export default ChecklistContent;
