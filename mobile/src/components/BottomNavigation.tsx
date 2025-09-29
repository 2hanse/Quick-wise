import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NAVIGATION_CONSTANTS, { TabName } from "../constants/navigation";

interface BottomNavigationProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const BottomNavigation = ({ activeTab, onTabPress }: BottomNavigationProps) => {
  const tabs = Object.values(NAVIGATION_CONSTANTS.TABS);

  return (
    <View className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex-row justify-around items-center">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.NAME}
          onPress={() => onTabPress(tab.NAME)}
          className="items-center gap-1"
          activeOpacity={0.7}
        >
          <Text className="text-[26px]">{tab.ICON}</Text>
          <Text
            className={`text-[11px] font-semibold ${
              activeTab === tab.NAME ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {tab.LABEL}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
