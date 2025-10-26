import { Box } from "@mui/material";
import { useContext } from "react";
import { AgendaView } from "../components/calendar/AgendaView.tsx";
import { CalendarHeader } from "../components/calendar/header/CalendarHeader.tsx";
import { MonthView } from "../components/calendar/MonthView.tsx";
import { HEADER_HEIGHT } from "../constants.ts";
import { useEvents } from "../hooks/useEvents.ts";
import { StateContext } from "../providers/StateContext.tsx";

export const CalendarPage = () => {
  const { data: events } = useEvents();

  const { viewMode, setViewMode, currentDate, setCurrentDate } = useContext(StateContext);

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
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box paddingTop={2} paddingBottom={2} paddingRight={2} height={HEADER_HEIGHT}>
        <CalendarHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </Box>
      <Box sx={{ flex: 1 }} paddingRight={1} paddingBottom={2}>
        <Box style={{ height: "100%" }}>
          {viewMode === "month" && (
            <MonthView events={events} currentDate={currentDate} />
          )}
          {viewMode === "agenda" && (
            <AgendaView events={events} currentDate={currentDate} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
