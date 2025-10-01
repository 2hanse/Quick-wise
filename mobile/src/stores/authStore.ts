import { create } from "zustand";
import { AuthState } from "../types/auth";
import {
  saveTokens as saveTokensToStorage,
  clearTokens as clearTokensFromStorage,
  getUser,
  hasValidToken,
} from "../utils/tokenStorage";
import AUTH_MESSAGES from "../constants/auth";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  setUser: (user) => set({ user }),

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  login: async (accessToken, reefreshToken, user) => {
    await saveTokensToStorage(accessToken, reefreshToken, user);
    set({ user, isLoggedIn: true });
  },

  logout: async () => {
    await clearTokensFromStorage();
    set({ user: null, isLoggedIn: false });
  },

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const tokenExists = await hasValidToken();
      if (tokenExists) {
        const storedUser = await getUser();
        set({ user: storedUser, isLoggedIn: true });
      } else {
        set({ user: null, isLoggedIn: false });
      }
    } catch (error) {
      console.error(AUTH_MESSAGES.ERROR.CHECK_AUTH_STATUS_FAILED, error);
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
