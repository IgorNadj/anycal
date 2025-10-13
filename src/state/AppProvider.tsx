import { type ReactNode, useState } from "react";
import type { Calendar, CalendarEvent, ViewMode } from "../types.ts";
import { AppContext, type AppContextType } from "./AppContext.tsx";

const DEFAULT_VIEW_MODE: ViewMode = "compact";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userUuid, setUserUuid] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<CalendarEvent | null>(null);

  const [currentlyEditingCalendar, setCurrentlyEditingCalendar] =
    useState<Calendar | null>(null);

  const [isCreatingCalendar, setIsCreatingCalendar] = useState<boolean>(false);

  const value: AppContextType = {
    userUuid,
    setUserUuid,
    viewMode,
    setViewMode,
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    currentlyEditingCalendar: currentlyEditingCalendar,
    setCurrentlyEditingCalendar: setCurrentlyEditingCalendar,
    isCreatingCalendar,
    setIsCreatingCalendar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
