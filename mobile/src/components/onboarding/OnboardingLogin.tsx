import React, { useState } from "react";
import { TouchableOpacity, Image, View, Text, Alert } from "react-native";
import {
  HEADER_TITLE,
  INTERLOCK_REASON,
  PRIVACY_PROTECTION,
  REASON_ITEMS,
  PRIVACY_TEXT,
  GOOGLE_BUTTON,
  LOGIN_MESSAGES,
  PROTECT_TEXT,
} from "../../constants/onboarding";
import { signInWithGoogle } from "../../services/authService";
import backendAuthService from "../../services/backendAuthService";
import { saveTokens } from "../../utils/tokenStorage";
import { OnboardingLoginProps } from "../../types/onboarding";

const OnboardingLogin = ({ onLoginComplete }: OnboardingLoginProps) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const googleResult = await signInWithGoogle();

      if (googleResult.type === "cancel") {
        setLoading(false);
        return;
      }

      if (!googleResult.tokens?.idToken) {
        throw new Error(LOGIN_MESSAGES.ERROR_NO_ID_TOKEN);
      }

      const backendResult = await backendAuthService.loginWithBackend(
        googleResult.tokens.idToken
      );

      await saveTokens(
        backendResult.accessToken,
        backendResult.refreshToken,
        backendResult.user
      );

      if (onLoginComplete) {
        onLoginComplete();
      }

      Alert.alert(
        LOGIN_MESSAGES.SUCCESS_TITLE,
        LOGIN_MESSAGES.SUCCESS_MESSAGE(backendResult.user.name)
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : LOGIN_MESSAGES.ERROR_UNKNOWN;
      Alert.alert(LOGIN_MESSAGES.ERROR_TITLE, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-white justify-center items-center mt-2 px-8 py-12 flex-col">
        <View className="items-center mb-6">
          <Text className="text-4xl text-blue-600 font-bold text-center leading-tight">
            {HEADER_TITLE.onboarding3}
            <Text className="text-gray-800 font-extrabold">
              {HEADER_TITLE.onboarding3_1}
            </Text>
          </Text>
          <View className="w-16 h-0.5 bg-gray-400 mx-auto mt-2"></View>
        </View>

        <View className="w-full mt-2 mb-6">
          <View className="flex-row items-center justify-center mb-4">
            <View className="w-6 h-6 bg-gray-100 rounded items-center justify-center mr-2">
              <Text className="text-xs">📊</Text>
            </View>
            <Text className="text-lg mr-3 font-semibold text-gray-900">
              {INTERLOCK_REASON}
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row mb-2 bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-600">
              <View className="w-6 h-6 bg-indigo-600 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-bold">1</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900 mb-1">
                  {REASON_ITEMS.item1.title}
                </Text>
                <Text className="text-xs text-gray-600 leading-relaxed">
                  {REASON_ITEMS.item1.description}
                </Text>
              </View>
            </View>

            <View className="flex-row bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-600">
              <View className="w-6 h-6 bg-indigo-600 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-bold">2</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900 mb-1">
                  {REASON_ITEMS.item2.title}
                </Text>
                <Text className="text-xs text-gray-600 leading-relaxed">
                  {REASON_ITEMS.item2.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full mb-8">
          <View className="flex-row items-center justify-center mb-4">
            <View className="w-6 h-6 bg-gray-100 rounded items-center justify-center mr-2">
              <Text className="text-xs">🔒</Text>
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              {PRIVACY_PROTECTION}
            </Text>
          </View>

          <View className="bg-green-50 border border-green-200 rounded-xl p-4">
            <View className="flex-row items-center mb-3">
              <View className="w-5 h-5 bg-green-500 rounded-full items-center justify-center mr-2">
                <Text className="text-white text-xs">🛡️</Text>
              </View>
              <Text className="text-sm font-semibold text-green-800">
                {PROTECT_TEXT}
              </Text>
            </View>
            <Text className="text-xs text-green-700 leading-relaxed">
              {PRIVACY_TEXT}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-full mb-8 bg-white border border-gray-300 h-14 rounded-lg flex-row items-center justify-center shadow-sm"
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
          disabled={loading}
        >
          <View className="w-5 h-5 flex-shrink-0 mr-3 items-center justify-center">
            <Image
              source={require("../../../assets/google-logo.png")}
              className="w-5 h-5"
            />
          </View>
          <Text className="text-gray-700 text-base font-medium">
            {loading ? GOOGLE_BUTTON.loading : GOOGLE_BUTTON.googleSignIn}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingLogin;
