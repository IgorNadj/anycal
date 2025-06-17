import { createContext } from "react";
import { Event, Thing, ViewMode } from "../types.ts";

export type AppContextType = {
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingEvent: Event | null;
  setCurrentlyEditingEvent: (event: Event | null) => void;
  currentlyEditingThing: Thing | null;
  setCurrentlyEditingThing: (thing: Thing | null) => void;
};

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const AppContext = createContext<AppContextType>(null);
