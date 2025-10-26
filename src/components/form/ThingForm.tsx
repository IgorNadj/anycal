import { Box, Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEvents } from "../../hooks/useEvents.ts";
import type { CalendarColour, Thing } from "../../types.ts";
import { getEventsForThing } from "../../utils.ts";
import { CalendarColourPicker } from "./CalendarColourPicker.tsx";
import { EventsTable } from "./EventsTable.tsx";

export const ThingForm = ({ initialThing }: { initialThing: Thing }) => {
  const { data: events } = useEvents();
  const existingEventsForThing = getEventsForThing(initialThing, events);
  const hasExistingEvents = existingEventsForThing.length > 0;

  const [name, setName] = useState<string>(initialThing.name || "");
  const [prompt, setPrompt] = useState<string>(initialThing.prompt || "");
  const [colour, setColour] = useState<CalendarColour>(initialThing.colour);

  const onRun = () => {
    console.log("onRun");
  };

  const onSave = () => {
    console.log("onSave");
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <Box>
      <Typography variant="h2">Add Anything</Typography>
      <Grid container>
        <Grid size={6}>
          <TextField
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />

          <TextField
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            label="Prompt"
            autoFocus
          />

          <Box sx={{ mb: 2 }}>
            <CalendarColourPicker colour={colour} onChange={setColour} />
          </Box>

          <Button variant="outlined" onClick={onRun}>
            Run
          </Button>
          <Button variant="outlined" onClick={onSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={onDelete}>
            Delete
          </Button>
        </Grid>
        <Grid size={6}>
          <Typography variant="h4">Examples</Typography>

          <ul>
            <li>Bosch legacy next season</li>
            <li>Severance s3</li>
            <li>Brisbane olympics</li>
            <li>Public Holidays Victoria</li>
            <li>
              Football matches in the champions league that include the team Manchester
              City
            </li>
            <li>Tennis matches with Novak Djokovic</li>
          </ul>
        </Grid>
      </Grid>
      <Box>
        <>
          <Typography variant="h3">Preview</Typography>
          <EventsTable events={existingEventsForThing} />
        </>
      </Box>
    </Box>
  );
};
