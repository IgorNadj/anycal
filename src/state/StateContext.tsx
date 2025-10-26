import { createContext } from "react";
import type { Calendar, CalendarEvent } from "../types.ts";

export type AppContextType = {
  currentlyEditingEvent: CalendarEvent | null;
  setCurrentlyEditingEvent: (event: CalendarEvent | null) => void;
  currentlyEditingCalendar: Calendar | null;
  setCurrentlyEditingCalendar: (calendar: Calendar | null) => void;
  isCreatingCalendar: boolean;
  setIsCreatingCalendar: (open: boolean) => void;
};

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const StateContext = createContext<AppContextType>(null);
