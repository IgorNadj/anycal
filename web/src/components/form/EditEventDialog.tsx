import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { useUpdateEvent } from "../../data/useUpdateEvent.ts";
import { useDeleteEvent } from "../../data/useDeleteEvent.ts";

export const EditEventDialog = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, setCurrentlyEditingEvent } = ctx;

  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [date, setDate] = useState<Date>(
    currentlyEditingEvent?.date ?? new Date(),
  );

  const [name, setName] = useState<string>(currentlyEditingEvent?.name ?? "");

  const onSave = () => {
    if (currentlyEditingEvent) {
      updateEvent({ ...currentlyEditingEvent, name, date });
      setCurrentlyEditingEvent(null);
    }
  };

  const onDelete = () => {
    if (currentlyEditingEvent) {
      setCurrentlyEditingEvent(null);
      deleteEvent({ ...currentlyEditingEvent, name, date });
    }
  };

  console.log("currentlyEditingEvent", currentlyEditingEvent);

  return (
    <Dialog
      open={currentlyEditingEvent !== null}
      onClose={() => setCurrentlyEditingEvent(null)}
    >
      <DialogTitle>Edit Event</DialogTitle>
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
