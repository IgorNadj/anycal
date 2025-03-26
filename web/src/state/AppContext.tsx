import { createContext } from "react";
import { AppContextType } from "./AppProvider.tsx";

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const AppContext = createContext<AppContextType>(null);
