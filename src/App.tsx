import { AppProvider } from "./state/AppProvider.tsx";
import { Main } from "./components/Main.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { getUserLocale } from "./utils.ts";

const userLocale = getUserLocale();

export const App = () => {
  return (
    <AppProvider>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={userLocale}
      >
        <Main />
      </LocalizationProvider>
    </AppProvider>
  );
};
