import { Box } from "@mui/material";
import { useContext } from "react";
import { CAL_HEADER_HEIGHT } from "../../constants.ts";
import { useEventsWithSpecificDate } from "../../hooks/useEventsWithSpecificDate.ts";
import { StateContext } from "../../providers/StateContext.tsx";
import { CalendarHeader } from "../header/CalendarHeader.tsx";
import { AgendaView } from "./AgendaView.tsx";
import { MonthView } from "./MonthView.tsx";

export const Calendar = () => {
  const events = useEventsWithSpecificDate();

  const { viewMode, currentDate } = useContext(StateContext);

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
    <Box>
      {/* Header */}
      <Box sx={{ height: CAL_HEADER_HEIGHT }}>
        <CalendarHeader />
      </Box>

      {/* Calendar (non-scrollable) */}
      <Box
        sx={{
          height: `calc(100vh - ${CAL_HEADER_HEIGHT}px)`,
          overflowY: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            height: "100%",
          }}
        >
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
