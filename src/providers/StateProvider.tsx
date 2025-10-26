import { type ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import type { Calendar, CalendarEvent, ViewMode } from "../types.ts";
import { type AppContextType, StateContext } from "./StateContext.tsx";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<CalendarEvent | null>(null);

  const [currentlyEditingCalendar, setCurrentlyEditingCalendar] =
    useState<Calendar | null>(null);

  const [isCreatingCalendar, setIsCreatingCalendar] = useState<boolean>(false);

  const value: AppContextType = {
    viewMode,
    setViewMode,
    currentDate,
    setCurrentDate,
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    currentlyEditingCalendar,
    setCurrentlyEditingCalendar,
    isCreatingCalendar,
    setIsCreatingCalendar,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
