import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useThemeStore } from "../store/useThemeStore";
import { ReactNode } from "react";
import { lightTheme, darkTheme } from "./theme";

const ThemeConfig = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useThemeStore();

  // Crear el tema en base al estado del modo oscuro
  const theme = createTheme(darkMode ? (darkTheme as ThemeOptions) : (lightTheme as ThemeOptions));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
