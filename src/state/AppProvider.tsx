import { type ReactNode, useState } from "react";
import type { Calendar, CalendarEvent } from "../types.ts";
import { AppContext, type AppContextType } from "./AppContext.tsx";
import type { ViewMode } from "../types.ts";

const DEFAULT_VIEW_MODE: ViewMode = "compact";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<CalendarEvent | null>(null);

  const [currentlyEditingCalendar, setCurrentlyEditingCalendar] =
    useState<Calendar | null>(null);

  const value: AppContextType = {
    viewMode,
    setViewMode,
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    currentlyEditingCalendar: currentlyEditingCalendar,
    setCurrentlyEditingCalendar: setCurrentlyEditingCalendar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
