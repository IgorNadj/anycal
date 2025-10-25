import { Box, Container, Grid2 as Grid } from "@mui/material";
import { useContext, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { useCalendars } from "../hooks/useCalendars.ts";
import { useEvents } from "../hooks/useEvents.ts";
import { AppContext } from "../state/AppContext.tsx";
import type { ViewMode } from "../types.ts";
import { AppHeader } from "./AppHeader.tsx";
import { AddCalendarDialog } from "./form/AddCalendarDialog.tsx";
import { EditCalendarDialog } from "./form/EditCalendarDialog.tsx";
import { EditEventDialog } from "./form/EditEventDialog.tsx";
import { LeftSidebar } from "./LeftSidebar.tsx";
import { MainCalendar } from "./MainCalendar.tsx";

export const Main = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, currentlyEditingCalendar } = ctx;

  const { data: calendars } = useCalendars();
  const { data: events } = useEvents();
  console.log("calendars", calendars);
  console.log("events", events);

  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <Container sx={{ py: { xs: 8, sm: 3 } }}>
      <Box>
        <Grid container spacing={1}>
          <Grid size={3}>
            <LeftSidebar />
          </Grid>
          <Grid size={9}>
            <AppHeader
              viewMode={viewMode}
              setViewMode={setViewMode}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
            <MainCalendar viewMode={viewMode} currentDate={currentDate} />
          </Grid>
        </Grid>
      </Box>
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditCalendarDialog key={currentlyEditingCalendar?.uuid} />
      <AddCalendarDialog />
    </Container>
  );
};
