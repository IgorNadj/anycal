import { useContext } from "react";
import { AgendaView } from "../components/calendar/AgendaView.tsx";
import { MonthView } from "../components/calendar/MonthView.tsx";
import { useEventsWithSpecificDate } from "../hooks/useEventsWithSpecificDate.ts";
import { StateContext } from "../providers/StateContext.tsx";

export const CalendarPage = () => {
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
    <>
      {viewMode === "month" && <MonthView events={events} currentDate={currentDate} />}
      {viewMode === "agenda" && <AgendaView events={events} currentDate={currentDate} />}
    </>
  );
};
