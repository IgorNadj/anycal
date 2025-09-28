import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import { AddCalendarForm } from "./form/AddCalendarForm.tsx";
import { Calendar } from "./calendar/Calendar.tsx";
import { useContext } from "react";
import { EditEventDialog } from "./form/EditEventDialog.tsx";
import { AppContext } from "../state/AppContext.tsx";
import { EditCalendarDialog } from "./form/EditCalendarDialog.tsx";
import { useUser } from "../hooks/useUser.ts";
import { useEvents } from "../data/useEvents.ts";
import { CalendarsList } from "./CalendarsList.tsx";
import { useCalendars } from "../data/useCalendars.ts";

export const Main = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, currentlyEditingCalendar } = ctx;

  const user = useUser();
  const { data: calendars } = useCalendars(user);
  const { data: events } = useEvents(user);
  console.log("calendars", calendars);
  console.log("events", events);

  return (
    <Container sx={{ py: { xs: 8, sm: 10 } }}>
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditCalendarDialog key={currentlyEditingCalendar?.uuid} />
      <Box>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Any Cal
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Add anything to your calendar.
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={10}>
          <Grid size={6}>
            <AddCalendarForm />
            <CalendarsList />
          </Grid>
          <Grid size={6}>
            <Calendar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
