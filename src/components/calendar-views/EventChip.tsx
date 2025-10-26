import { Box, Typography } from "@mui/material";
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
    <Box
      borderRadius={10}
      sx={{
        backgroundColor: CALENDAR_COLOURS[calendar.colour],
        width: "100%",
      }}
      onClick={() => setCurrentlyEditingEvent(event)}
    >
      <Typography
        variant="body2"
        padding={0.5}
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "100%",
          textWrap: "nowrap",
          cursor: "pointer",
        }}
      >
        {event.name}
      </Typography>
    </Box>
  );
};
