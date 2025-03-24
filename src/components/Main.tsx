import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { AddThingForm } from "./AddThingForm.tsx";
import { Calendar } from "./calendar/Calendar.tsx";
import { useContext } from "react";
import { EditEventDialog } from "./EditEventDialog.tsx";
import { AppContext } from "../state/AppContext.tsx";
import { ThingsList } from "./ThingsList.tsx";
import { EditThingDialog } from "./EditThingDialog.tsx";

export const Main = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, currentlyEditingThing, resetWithFakeData } =
    ctx;

  return (
    <Container sx={{ py: { xs: 8, sm: 10 } }}>
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditThingDialog key={currentlyEditingThing?.uuid} />
      <Button onClick={() => resetWithFakeData()}>Use fake data</Button>
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
