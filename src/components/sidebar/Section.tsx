import { Box, ListItemButton } from "@mui/material";
import { NavLink, useParams } from "react-router";
import { useCalendars } from "../../hooks/useCalendars.ts";
import type { Calendar } from "../../types.ts";
import { ThingsList } from "./ThingsList.tsx";

type Props = {
  calendar: Calendar;
};

export const Section = ({ calendar }: Props) => {
  let params = useParams();
  const selectedCalendarUuid = params.calendarUuid;

  const { data: calendars } = useCalendars();
  const hasMultipleCalendars = calendars.length > 1;

  return (
    <Box>
      {hasMultipleCalendars && (
        <ListItemButton
          component={NavLink}
          to={`/cal/${calendar.uuid}`}
          selected={selectedCalendarUuid === calendar.uuid}
        >
          {calendar.name || "Calendar"}
        </ListItemButton>
      )}

      <ThingsList calendar={calendar} showHeader={hasMultipleCalendars} />
    </Box>
  );
};
