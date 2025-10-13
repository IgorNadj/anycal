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

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={userLocale}>
            <Main />
            <ReactQueryDevtools initialIsOpen={false} />
          </LocalizationProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};
