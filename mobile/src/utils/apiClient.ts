import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import API_CONSTANTS from "../constants/api";
import { RefreshTokenError } from "../types/auth";

const apiClient = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  timeout: API_CONSTANTS.TIMEOUT,
  headers: {
    "Content-Type": API_CONSTANTS.HEADERS.CONTENT_TYPE,
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem(
      API_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem(
          API_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN
        );

        if (!refreshToken) {
          const noTokenError: RefreshTokenError = {
            code: "NO_REFRESH_TOKEN",
            message: API_CONSTANTS.TOKEN_REFRESH.NO_REFRESH_TOKEN,
            originalError: new Error(
              API_CONSTANTS.ERROR_MESSAGES.NO_REFRESH_TOKEN
            ),
          };
          throw noTokenError;
        }

        const response = await axios.post(
          `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.AUTH.REFRESH}`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await AsyncStorage.setItem(
          API_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN,
          accessToken
        );
        await AsyncStorage.setItem(
          API_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
          newRefreshToken
        );

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove([
          API_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN,
          API_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
          API_CONSTANTS.STORAGE_KEYS.USER,
        ]);

        Toast.show({
          type: API_CONSTANTS.TOAST.ERROR_TYPE,
          text1: API_CONSTANTS.TOKEN_REFRESH.FAILED_TITLE,
          text2: API_CONSTANTS.TOKEN_REFRESH.FAILED_MESSAGE,
          visibilityTime: API_CONSTANTS.TOAST.DURATION,
          position: API_CONSTANTS.TOAST.POSITION,
          topOffset: API_CONSTANTS.TOAST.TOP_OFFSET,
        });

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
