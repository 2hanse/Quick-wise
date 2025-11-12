import apiClient from "../utils/apiClient";
import API_CONSTANTS from "../constants/api";
import AUTH_MESSAGES from "../constants/auth";
import {
  BackendLoginResponse,
  BackendRefreshResponse,
  BackendUser,
} from "../types/auth";

const loginWithBackend = async (
  idToken: string,
  googleAccessToken: string,
  serverAuthCode?: string,
  expiresIn?: number
): Promise<BackendLoginResponse> => {
  try {
    const response = await apiClient.post<BackendLoginResponse>(
      API_CONSTANTS.ENDPOINTS.AUTH.GOOGLE,
      {
        idToken,
        googleAccessToken,
        serverAuthCode,
        expiresIn,
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data?: { error?: string } };
      message?: string;
    };

    console.error(
      AUTH_MESSAGES.ERROR.BACKEND_LOGIN_FAILED,
      axiosError.response?.data || axiosError.message
    );

    throw new Error(
      axiosError.response?.data?.error || AUTH_MESSAGES.UI.LOGIN_ERROR_DEFAULT
    );
  }
};

const refreshAccessToken = async (
  refreshToken: string
): Promise<BackendRefreshResponse> => {
  try {
    const response = await apiClient.post<BackendRefreshResponse>(
      API_CONSTANTS.ENDPOINTS.AUTH.REFRESH,
      {
        refreshToken,
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data?: { error?: string } };
      message?: string;
    };

    console.error(
      AUTH_MESSAGES.ERROR.TOKEN_REFRESH_FAILED,
      axiosError.response?.data || axiosError.message
    );

    throw new Error(
      axiosError.response?.data?.error ||
        AUTH_MESSAGES.UI.TOKEN_REFRESH_ERROR_DEFAULT
    );
  }
};

const getCurrentUserFromBackend = async (): Promise<BackendUser> => {
  try {
    const response = await apiClient.get(API_CONSTANTS.ENDPOINTS.AUTH.ME);
    return response.data.user;
  } catch (error) {
    const axiosError = error as {
      response?: { data?: { error?: string } };
      message?: string;
    };

    console.error(
      AUTH_MESSAGES.ERROR.GET_USER_INFO_FAILED,
      axiosError.response?.data || axiosError.message
    );

    throw new Error(
      axiosError.response?.data?.error ||
        AUTH_MESSAGES.UI.GET_USER_INFO_ERROR_DEFAULT
    );
  }
};

export default {
  loginWithBackend,
  refreshAccessToken,
  getCurrentUserFromBackend,
};
