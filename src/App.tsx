import { createTheme, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Main } from "./components/Main.tsx";
import { AppProvider } from "./state/AppProvider.tsx";
import { AuthProvider } from "./state/AuthProvider.tsx";
import { getUserLocale } from "./utils.ts";

const userLocale = getUserLocale();

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffcc00",
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

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={userLocale}>
            <ThemeProvider theme={theme}>
              <Main />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </LocalizationProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};
