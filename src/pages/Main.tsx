import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router";
import { AppLogo } from "../components/AppLogo.tsx";
import { AddCalendarDialog } from "../components/form/AddCalendarDialog.tsx";
import { EditCalendarDialog } from "../components/form/EditCalendarDialog.tsx";
import { EditEventDialog } from "../components/form/EditEventDialog.tsx";
import { LeftSidebar } from "../components/LeftSidebar.tsx";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { useCalendars } from "../hooks/useCalendars.ts";
import { useEvents } from "../hooks/useEvents.ts";
import { StateContext } from "../providers/StateContext.tsx";
import type { ViewMode } from "../types.ts";
import { CalendarPage } from "./CalendarPage.tsx";
import { Loading } from "./Loading.tsx";
import { PageNotFoundPage } from "./PageNotFoundPage.tsx";
import { ThingPage } from "./ThingPage.tsx";
import { Welcome } from "./Welcome.tsx";

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
      <Box sx={{ height: "100%", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route
            path="/home"
            element={
              <CalendarPage
                headerHeight={headerHeight}
                viewMode={viewMode}
                setViewMode={setViewMode}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
            }
          />
          <Route path="/thing/:uuid" element={<ThingPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
      </Box>
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditCalendarDialog key={currentlyEditingCalendar?.uuid} />
      <AddCalendarDialog />
    </Box>
  );
};
