import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../state/AppContext.tsx";
import { CalendarColourPicker } from "./form/CalendarColourPicker.tsx";
import { CalendarColour } from "../types/types.ts";

export const EditThingDialog = () => {
  const ctx = useContext(AppContext);
  const {
    currentlyEditingThing,
    setCurrentlyEditingThing,
    saveThing,
    deleteThing,
  } = ctx;

  const [name, setName] = useState<string>(currentlyEditingThing?.name ?? "");
  const [colour, setColour] = useState<CalendarColour>(
    currentlyEditingThing?.colour ?? "mediumBlue",
  );

  const onSave = () => {
    if (currentlyEditingThing) {
      saveThing({ ...currentlyEditingThing, name, colour });
      setCurrentlyEditingThing(null);
    }
  };

  const onDelete = () => {
    if (currentlyEditingThing) {
      setCurrentlyEditingThing(null);
      deleteThing({ ...currentlyEditingThing, name });
    }
  };

  console.log("currentlyEditingThing", currentlyEditingThing);

  return (
    <Dialog
      open={currentlyEditingThing !== null}
      onClose={() => setCurrentlyEditingThing(null)}
    >
      <DialogTitle>Edit Thing</DialogTitle>
      <DialogContent>
        <CalendarColourPicker
          colour={colour}
          onChange={(newColour) => setColour(newColour)}
        />
        <TextField
          variant="outlined"
          sx={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onSave()}>
          Save
        </Button>
        <Button variant="contained" onClick={() => onDelete()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
