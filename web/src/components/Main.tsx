import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import { AddThingForm } from "./form/AddThingForm.tsx";
import { Calendar } from "./calendar/Calendar.tsx";
import { useContext } from "react";
import { EditEventDialog } from "./form/EditEventDialog.tsx";
import { AppContext } from "../state/AppContext.tsx";
import { ThingsList } from "./ThingsList.tsx";
import { EditThingDialog } from "./form/EditThingDialog.tsx";

export const Main = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, currentlyEditingThing } = ctx;

  const { things, events } = ctx;
  console.log("things", things);
  console.log("events", events);

  return (
    <Container sx={{ py: { xs: 8, sm: 10 } }}>
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditThingDialog key={currentlyEditingThing?.uuid} />
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
            <AddThingForm />
            <ThingsList />
          </Grid>
          <Grid size={6}>
            <Calendar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
