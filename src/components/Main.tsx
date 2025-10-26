import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { useCalendars } from "../hooks/useCalendars.ts";
import { useEvents } from "../hooks/useEvents.ts";
import { StateContext } from "../state/StateContext.tsx";
import type { ViewMode } from "../types.ts";
import { AppHeader } from "./AppHeader.tsx";
import { AppLogo } from "./AppLogo.tsx";
import { AddCalendarDialog } from "./form/AddCalendarDialog.tsx";
import { EditCalendarDialog } from "./form/EditCalendarDialog.tsx";
import { EditEventDialog } from "./form/EditEventDialog.tsx";
import { LeftSidebar } from "./LeftSidebar.tsx";
import { MainCalendar } from "./MainCalendar.tsx";

export const Main = () => {
  const ctx = useContext(StateContext);
  const { currentlyEditingEvent, currentlyEditingCalendar } = ctx;

  const { data: calendars } = useCalendars();
  const { data: events } = useEvents();
  console.log("calendars", calendars);
  console.log("events", events);

  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const headerHeight = 70;

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f3f8fb",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Left */}
      <Box
        sx={{ height: "100%", display: "flex", flexDirection: "column", width: "400px" }}
      >
        <Box margin={2} height={headerHeight}>
          <AppLogo />
        </Box>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          {/* Scrollable content */}
          <Box sx={{ overflowY: "auto", height: "100%" }}>
            <Box padding={2}>
              <LeftSidebar />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Right */}
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
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
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditCalendarDialog key={currentlyEditingCalendar?.uuid} />
      <AddCalendarDialog />
    </Box>
  );
};
