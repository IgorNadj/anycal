import { Chip } from "@mui/material";
import { useContext } from "react";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { AppContext } from "../../state/AppContext.tsx";
import type { CalendarEvent } from "../../types.ts";
import { getCalendarForEvent } from "../../utils.ts";

export const EventChip = ({ event }: { event: CalendarEvent }) => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingEvent } = ctx;

  const { data: calendars } = useCalendars();

  const calendar = getCalendarForEvent(event, calendars);
  if (!calendar) {
    return null;
  }

  if (!calendar.visible) {
    return null;
  }

  return (
    <Chip
      sx={{
        backgroundColor: CALENDAR_COLOURS[calendar.colour],
        width: "100%",
        overflow: "hidden",
        "& .MuiChip-label": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
          maxWidth: "100%",
        },
      }}
      label={event.name}
      onClick={() => setCurrentlyEditingEvent(event)}
    />
  );
};
