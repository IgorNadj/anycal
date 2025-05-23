"use client";

import { AppProvider } from "./state/AppProvider.tsx";
import { Main } from "./components/Main.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enGB } from "date-fns/locale";
import { StrictMode } from "react";

const userLocale = enGB;

const queryClient = new QueryClient();

export const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={userLocale}
          >
            <Main />
          </LocalizationProvider>
        </AppProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
