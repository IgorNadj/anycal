import { type ReactNode, useState } from "react";
import type { Calendar, CalendarEvent } from "../types.ts";
import { AppContext, type AppContextType } from "./AppContext.tsx";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<CalendarEvent | null>(null);

  const [currentlyEditingCalendar, setCurrentlyEditingCalendar] =
    useState<Calendar | null>(null);

  const [isCreatingCalendar, setIsCreatingCalendar] = useState<boolean>(false);

  const value: AppContextType = {
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    currentlyEditingCalendar,
    setCurrentlyEditingCalendar,
    isCreatingCalendar,
    setIsCreatingCalendar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
