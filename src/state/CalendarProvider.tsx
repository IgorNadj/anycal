import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { CalendarContext } from "./CalendarContext.tsx";

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  return (
    <CalendarContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </CalendarContext.Provider>
  );
};
