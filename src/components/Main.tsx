import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { AddForm } from "./AddForm.tsx";
import { Calendar } from "./calendar/Calendar.tsx";
import { useContext } from "react";
import { EditDialog } from "./EditDialog.tsx";
import { AppContext } from "../state/AppContext.tsx";
import { ThingsList } from "./ThingsList.tsx";

export const Main = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, resetWithFakeData } = ctx;

  return (
    <Container sx={{ py: { xs: 8, sm: 10 } }}>
      <EditDialog key={currentlyEditingEvent?.uuid} />
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
            <AddForm />
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
