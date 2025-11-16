import { Box, Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CalendarColourPicker } from "../../components/form/CalendarColourPicker.tsx";
import { ThingRunResultTable } from "../../components/form/ThingRunResultTable.tsx";
import { useEvents } from "../../hooks/useEvents.ts";
import { useUpdateThing } from "../../hooks/useUpdateThing.ts";
import type { CalendarColour, Thing } from "../../types.ts";

export const Content = ({ thing }: { thing: Thing }) => {
  const [prompt, setPrompt] = useState<string>(thing.prompt || "");

  const { mutate: updateThing, isPending: isRunPending } = useUpdateThing();

  const { data: allEvents } = useEvents();
  const events = allEvents.filter((e) => e.thingUuid === thing.uuid);

  const onRun = () => {
    console.log("onRun", prompt);

    if (!thing) return;

    updateThing({
      ...thing,
      prompt,
    });
  };

  const onColourChange = (newColour: CalendarColour) => {
    updateThing({
      ...thing,
      colour: newColour,
    });
  };

  return (
    <Box>
      <Typography variant="h2">{thing.niceName || thing.name || "New Thing"}</Typography>
      <Grid container>
        <Grid size={6}>
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
            <CalendarColourPicker colour={thing.colour} onChange={onColourChange} />
          </Box>

          <Button variant="outlined" onClick={onRun} loading={isRunPending}>
            Run
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
          <ThingRunResultTable events={events} thing={thing} />
        </>
      </Box>
    </Box>
  );
};
