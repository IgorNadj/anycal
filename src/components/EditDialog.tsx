import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const EditDialog = () => {
  const ctx = useContext(AppContext);
  const {
    currentlyEditingThing,
    setCurrentlyEditingThing,
    saveThing,
    deleteThing,
  } = ctx;

  const [date, setDate] = useState<Date>(
    currentlyEditingThing?.date ?? new Date(),
  );

  const [name, setName] = useState<string>(currentlyEditingThing?.name ?? "");

  const onSave = () => {
    if (currentlyEditingThing) {
      saveThing({ ...currentlyEditingThing, name, date });
      setCurrentlyEditingThing(null);
    }
  };

  const onDelete = () => {
    if (currentlyEditingThing) {
      setCurrentlyEditingThing(null);
      deleteThing({ ...currentlyEditingThing, name, date });
    }
  };

  console.log("currentlyEditingThing", currentlyEditingThing);

  return (
    <Dialog
      open={currentlyEditingThing !== null}
      onClose={() => setCurrentlyEditingThing(null)}
    >
      <DialogContent>
        <TextField
          variant="outlined"
          sx={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DatePicker value={date} onChange={(date) => date && setDate(date)} />
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
