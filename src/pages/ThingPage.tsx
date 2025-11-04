import { Box, Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { ThingRunResultTable } from "../components/form/ThingRunResultTable.tsx";
import { useEvents } from "../hooks/useEvents.ts";
import { useThings } from "../hooks/useThings.ts";
import { useUpdateThing } from "../hooks/useUpdateThing.ts";

export const ThingPage = () => {
  const { thingUuid } = useParams();
  const { data: allThings } = useThings();
  const thing = thingUuid ? allThings.find((t) => t.uuid === thingUuid) : null;

  const [prompt, setPrompt] = useState<string>(thing?.prompt || "");

  const { mutate: updateThing, isPending: isRunPending } = useUpdateThing();

  const { data: allEvents } = useEvents();
  const events = allEvents.filter((e) => e.thingUuid === thingUuid);

  const onRun = () => {
    console.log("onRun", prompt);

    if (!thing) return;

    updateThing({
      ...thing,
      prompt,
    });
  };

  const onSave = () => {
    console.log("onSave");
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  if (!thingUuid || !thing) {
    return <div>Error: Thing not found</div>;
  }

  return (
    <Box>
      <Typography variant="h2">{thing.name || "Thing"}</Typography>
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

          {/*<Box sx={{ mb: 2 }}>*/}
          {/*  <CalendarColourPicker colour={colour} onChange={setColour} />*/}
          {/*</Box>*/}

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
          <ThingRunResultTable events={events} thing={thing} />
        </>
      </Box>
    </Box>
  );
};
