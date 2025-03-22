import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import { useState } from "react";
import { AddForm } from "./components/AddForm.tsx";
import { Thing } from "./types/types.ts";
import { Calendar } from "./components/calendar/Calendar.tsx";

const FAKE_DATA = [
  {
    uuid: "1123",
    name: "Something",
    date: new Date("2025-05-29T08:37:07.448Z"),
  },
  {
    uuid: "1124",
    name: "Something Else",
    date: new Date("2025-09-18T08:37:07.448Z"),
  },
  {
    uuid: "1125",
    name: "Something Something Else",
    date: new Date("2027-09-02T08:37:07.448Z"),
  },
  {
    uuid: "1126",
    name: "Something Something Else 2",
    date: new Date("2028-10-08T07:37:07.448Z"),
  },
];

export const App = () => {
  const [things, setThings] = useState<Thing[]>(FAKE_DATA);

  const onAddNewThingToCalendar = (thing: Thing) => {
    console.log("adding", thing);
    setThings([...things, thing]);
    console.log("things", JSON.stringify(things));
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
