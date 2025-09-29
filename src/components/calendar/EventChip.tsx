import type { CalendarEvent } from "../../types.ts";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";

export const EventChip = ({ event }: { event: CalendarEvent }) => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingEvent } = ctx;

  const { data: calendars } = useCalendars();

  const calendar = calendars.find((c) => c.uuid === event.calendarUuid);
  if (!calendar) {
    return null;
  }

  return (
    <Chip
      sx={{ backgroundColor: CALENDAR_COLOURS[calendar.colour] }}
      label={event.name}
      onClick={() => setCurrentlyEditingEvent(event)}
    />
  );
};
