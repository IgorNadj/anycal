import { Box, ListItemButton } from "@mui/material";
import { NavLink, useParams } from "react-router";
import type { Calendar } from "../../types.ts";
import { ThingsList } from "./ThingsList.tsx";

type Props = {
  calendar: Calendar;
};

export const Section = ({ calendar }: Props) => {
  let params = useParams();
  const selectedCalendarUuid = params.calendarUuid;

  return (
    <Box>
      <ListItemButton
        component={NavLink}
        to={`/cal/${calendar.uuid}`}
        selected={selectedCalendarUuid === calendar.uuid}
      >
        Calendar
      </ListItemButton>

      <ThingsList calendar={calendar} />
    </Box>
  );
};
