import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { CalendarColourPicker } from "../../components/form/CalendarColourPicker.tsx";
import { useUpdateThing } from "../../hooks/useUpdateThing.ts";
import type { CalendarColour, Thing } from "../../types.ts";

export const Content = ({ thing }: { thing: Thing }) => {
  const [prompt, setPrompt] = useState<string>(thing.prompt || "");

  const { mutate: updateThing, isPending: isRunPending } = useUpdateThing();

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
    </Box>
  );
};
