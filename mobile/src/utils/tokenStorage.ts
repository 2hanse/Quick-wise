import AsyncStorage from "@react-native-async-storage/async-storage";
import API_CONSTANTS from "../constants/api";
import { TOKEN_MESSAGES } from "../constants/token";
import { BackendUser } from "../types/auth";

const saveTokens = async (
  accessToken: string,
  refreshToken: string,
  user: BackendUser
): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      [API_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, accessToken],
      [API_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
      [API_CONSTANTS.STORAGE_KEYS.USER, JSON.stringify(user)],
    ]);
  } catch (error) {
    console.error(TOKEN_MESSAGES.ERROR.SAVE_FAILED, error);
    throw error;
  }
};

const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(API_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error(TOKEN_MESSAGES.ERROR.GET_ACCESS_TOKEN_FAILED, error);
    return null;
  }
};

const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(API_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error(TOKEN_MESSAGES.ERROR.GET_REFRESH_TOKEN_FAILED, error);
    return null;
  }
};

const getUser = async (): Promise<BackendUser | null> => {
  try {
    const userJson = await AsyncStorage.getItem(
      API_CONSTANTS.STORAGE_KEYS.USER
    );
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error(TOKEN_MESSAGES.ERROR.GET_USER_FAILED, error);
    return null;
  }
};

const clearTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      API_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN,
      API_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
      API_CONSTANTS.STORAGE_KEYS.USER,
    ]);
  } catch (error) {
    console.error(TOKEN_MESSAGES.ERROR.CLEAR_FAILED, error);
    throw error;
  }
};

const hasValidToken = async (): Promise<boolean> => {
  try {
    const accessToken = await getAccessToken();
    return accessToken !== null;
  } catch (error) {
    console.error(TOKEN_MESSAGES.ERROR.CHECK_VALIDITY_FAILED, error);
    return false;
  }
};

export {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  getUser,
  clearTokens,
  hasValidToken,
};
