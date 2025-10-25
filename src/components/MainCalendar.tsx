import { useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { useEvents } from "../hooks/useEvents.ts";
import type { ViewMode } from "../types.ts";
import { AppHeader } from "./AppHeader.tsx";
import { MonthView } from "./calendar-views/MonthView.tsx";

export const MainCalendar = () => {
  const { data: events } = useEvents();

  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const earliestYear = new Date().getFullYear();
  const latestYear =
    events.length === 0
      ? earliestYear
      : Math.max(...events.map((event) => event.date.getFullYear()));
  let years: number[] = [];
  for (let y = earliestYear; y <= latestYear; y++) {
    years = [...years, y];
  }

  return (
    <>
      <AppHeader viewMode={viewMode} onChange={setViewMode} />
      {viewMode === "month" && (
        <MonthView
          events={events}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}
    </>
  );
};
