import { Box } from "@mui/material";
import { AppHeader } from "../components/AppHeader.tsx";
import { MainCalendar } from "../components/MainCalendar.tsx";
import type { ViewMode } from "../types.ts";

type Props = {
  headerHeight: number;
  viewMode: ViewMode;
  setViewMode: (newViewMode: ViewMode) => void;
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
};

export const CalendarPage = (props: Props) => {
  const { headerHeight, viewMode, setViewMode, currentDate, setCurrentDate } = props;
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box paddingTop={2} paddingBottom={2} paddingRight={2} height={headerHeight}>
        <AppHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </Box>
      <Box sx={{ flex: 1 }} paddingRight={1} paddingBottom={2}>
        <MainCalendar viewMode={viewMode} currentDate={currentDate} />
      </Box>
    </Box>
  );
};
