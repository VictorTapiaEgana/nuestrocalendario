// import { create } from "zustand";

// interface ThemeState {
//   darkMode: boolean;
//   toggleTheme: () => void;
// }

// export const useThemeStore = create<ThemeState>((set) => ({
//   darkMode: false, 
//   toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
// }));

import { create } from "zustand";
import { lightTheme, darkTheme } from "../theme/theme";

interface ThemeState {
  darkMode: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false, // Modo claro por defecto
  colors: {
    primary: lightTheme.palette.primary.main,
    secondary: lightTheme.palette.secondary.main,
    background: lightTheme.palette.background.default,
    text: lightTheme.palette.text.primary,
  },
  toggleTheme: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      const newTheme = newDarkMode ? darkTheme : lightTheme;
      return {
        darkMode: newDarkMode,
        colors: {
          primary: newTheme.palette.primary.main,
          secondary: newTheme.palette.secondary.main,
          background: newTheme.palette.background.default,
          text: newTheme.palette.text.primary,
        },
      };
    }),
}));
