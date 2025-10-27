import { Box, Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRunThing } from "../../hooks/useRunThing.ts";
import type { CalendarColour, Thing } from "../../types.ts";
import { CalendarColourPicker } from "./CalendarColourPicker.tsx";
import { ThingRunResultTable } from "./ThingRunResultTable.tsx";

export const ThingForm = ({ initialThing }: { initialThing: Thing }) => {
  const [colour, setColour] = useState<CalendarColour>(initialThing.colour);

  const [name, setName] = useState<string>(initialThing.name || "");

  const [prompt, setPrompt] = useState<string>(initialThing.prompt || "");
  const [runPrompt, setRunPrompt] = useState<string>("");

  const { data: runThingResults, isFetching: isRunPending } = useRunThing(runPrompt);

  const onRun = () => {
    console.log("onRun", prompt);
    setRunPrompt(prompt);
  };

  const onSave = () => {
    console.log("onSave");
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <Box>
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
          />

          <Box sx={{ mb: 2 }}>
            <CalendarColourPicker colour={colour} onChange={setColour} />
          </Box>

          <Button variant="outlined" onClick={onRun} loading={isRunPending}>
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
          <ThingRunResultTable resp={runThingResults} />
        </>
      </Box>
    </Box>
  );
};
