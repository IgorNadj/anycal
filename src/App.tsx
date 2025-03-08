import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import { useState } from "react";
import { AddForm } from "./components/AddForm.tsx";
import { Thing } from "./types/types.ts";
import { Calendar } from "./components/Calendar.tsx";

export const App = () => {
  const [things, setThings] = useState<Thing[]>([]);

  const onAddNewThingToCalendar = (thing: Thing) => {
    console.log("adding", thing);
    setThings([...things, thing]);
  };

  return (
    <Container sx={{ py: { xs: 8, sm: 10 } }}>
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
            <AddForm onSubmit={onAddNewThingToCalendar} />
          </Grid>
          <Grid size={6}>
            <Calendar things={things} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
