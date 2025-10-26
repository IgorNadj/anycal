import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { StateContext } from "../../state/StateContext.tsx";
import type { CalendarEvent } from "../../types.ts";
import { getCalendarForEvent } from "../../utils.ts";

export const EventChip = ({ event }: { event: CalendarEvent }) => {
  const ctx = useContext(StateContext);
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
        paddingLeft={0.5}
        paddingRight={0.5}
        paddingTop={0.2}
        paddingBottom={0.2}
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          textWrap: "nowrap",
          cursor: "pointer",
        }}
      >
        {event.name}
      </Typography>
    </Box>
  );
};
