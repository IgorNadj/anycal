import { createContext } from "react";
import { ViewMode } from "../../../types/types.ts";
import { DEFAULT_VIEW_MODE } from "../../../constants.ts";

type Ctx = {
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
};

export const CalendarContext = createContext<Ctx>({
  viewMode: DEFAULT_VIEW_MODE,
  setViewMode: () => {},
});
