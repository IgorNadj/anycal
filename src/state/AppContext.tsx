import { createContext } from "react";
import type { CalendarEvent, Calendar, ViewMode } from "../types.ts";

export type AppContextType = {
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingEvent: CalendarEvent | null;
  setCurrentlyEditingEvent: (event: CalendarEvent | null) => void;
  currentlyEditingCalendar: Calendar | null;
  setCurrentlyEditingCalendar: (calendar: Calendar | null) => void;
};

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const AppContext = createContext<AppContextType>(null);
