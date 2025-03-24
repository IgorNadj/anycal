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

export const Main = () => {
  const ctx = useContext(AppContext);
  const { things, setThings, currentlyEditingThing } = ctx;

  console.log("things", things);

  return (
    <Container sx={{ py: { xs: 8, sm: 10 } }}>
      <EditDialog key={currentlyEditingThing?.uuid} />
      <Button onClick={() => setThings(FAKE_DATA)}>Add defaults</Button>
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
          </Grid>
          <Grid size={6}>
            <Calendar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
