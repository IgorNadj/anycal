import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import { Main } from "./pages/Main.tsx";
import { PageNotFoundPage } from "./pages/PageNotFoundPage.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import { StateProvider } from "./providers/StateProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { getUserLocale } from "./utils.ts";

const userLocale = getUserLocale();

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={userLocale}>
            <ThemeProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="*" element={<PageNotFoundPage />} />
                </Routes>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </LocalizationProvider>
        </AuthProvider>
      </StateProvider>
    </QueryClientProvider>
  );
};
