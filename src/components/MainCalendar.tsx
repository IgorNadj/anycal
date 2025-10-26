import { Box } from "@mui/material";
import { useEvents } from "../hooks/useEvents.ts";
import type { ViewMode } from "../types.ts";
import { AgendaView } from "./calendar-views/AgendaView.tsx";
import { MonthView } from "./calendar-views/MonthView.tsx";

type Props = {
  viewMode: ViewMode;
  currentDate: Date;
};

export const MainCalendar = ({ viewMode, currentDate }: Props) => {
  const { data: events } = useEvents();

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
    <Box style={{ height: "100%" }}>
      {viewMode === "month" && <MonthView events={events} currentDate={currentDate} />}
      {viewMode === "agenda" && <AgendaView events={events} currentDate={currentDate} />}
    </Box>
  );
};
