import { CssBaseline } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { getUserLocale } from "../utils.ts";
import { AuthProvider } from "./AuthProvider.tsx";
import { StateProvider } from "./StateProvider.tsx";
import { ThemeProvider } from "./ThemeProvider.tsx";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const userLocale = getUserLocale();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={userLocale}>
            <ThemeProvider>
              <CssBaseline />
              <BrowserRouter>{children}</BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </LocalizationProvider>
        </AuthProvider>
      </StateProvider>
    </QueryClientProvider>
  );
};
