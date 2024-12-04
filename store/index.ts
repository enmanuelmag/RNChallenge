import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UserType } from '@customTypes/user';

type ThemeOptions = 'light' | 'dark' | string;

type UserSlice = {
  //states
  tabSelected: 'pokedex' | 'team' | 'settings';
  user: UserType | null;
  theme: ThemeOptions;
  usedSystemTheme: boolean;
};

type UserSliceActions = {
  //actions
  clear: () => void;
  setUser: (user?: UserType | null) => void;
  setTheme: (theme: ThemeOptions) => void;
  setUsedSystemTheme: (usedSystemTheme: boolean) => void;
  setTabSelected: (tabSelected: UserSlice['tabSelected']) => void;
};

const initialUserSlice: UserSlice = {
  user: null,
  theme: 'light',
  tabSelected: 'pokedex',
  usedSystemTheme: false,
};

export const useAppStore = create(
  persist<UserSlice & UserSliceActions>(
    (set) => ({
      ...initialUserSlice,
      //actions
      clear: () => set(initialUserSlice),
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setUsedSystemTheme: (usedSystemTheme) => set({ usedSystemTheme }),
      setTabSelected: (tabSelected) => set({ tabSelected }),
    }),
    {
      version: 2,
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
