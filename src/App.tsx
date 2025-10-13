import { AppProvider } from "./state/AppProvider.tsx";
import { Main } from "./components/Main.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { getUserLocale } from "./utils.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const userLocale = getUserLocale();

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={userLocale}>
          <Main />
          <ReactQueryDevtools initialIsOpen={false} />
        </LocalizationProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};
