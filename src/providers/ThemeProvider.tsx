import { createTheme, ThemeProvider as BaseThemeProvider } from "@mui/material";
import { type ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#a100ff",
    },
    secondary: {
      main: "#3b9bf8",
    },
    info: {
      main: "#4ca4ee",
    },
    success: {
      main: "#4ca4ee",
    },
    background: {
      default: "#292929",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Roboto", "sans-serif"].join(","),
    fontSize: 13,
    h6: {
      fontSize: "0.9rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h4: {
      fontSize: "1.1rem",
    },
    h3: {
      fontSize: "1.2rem",
    },
    h2: {
      fontSize: "1.4rem",
    },
    h1: {
      fontSize: "1.6rem",
      fontWeight: 300,
    },
    body2: {
      fontSize: 12,
      fontFamily: "Lexend, Roboto, sans-serif",
      fontWeight: 300,
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
};
