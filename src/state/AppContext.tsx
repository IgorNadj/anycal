import { createContext } from "react";
import type { CalendarEvent, Thing, ViewMode } from "../types.ts";

export type AppContextType = {
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingEvent: CalendarEvent | null;
  setCurrentlyEditingEvent: (event: CalendarEvent | null) => void;
  currentlyEditingThing: Thing | null;
  setCurrentlyEditingThing: (thing: Thing | null) => void;
};

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const AppContext = createContext<AppContextType>(null);
