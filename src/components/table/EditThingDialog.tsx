'use client';

// src/components/form/EditThingDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { CalendarColourPicker } from "../form/CalendarColourPicker.tsx";
import { CalendarColour } from "../../types/types.ts";
import { EventsTable } from "./EventsTable.tsx";

export const EditThingDialog = () => {
  const ctx = useContext(AppContext);
  const {
    currentlyEditingThing,
    setCurrentlyEditingThing,
    updateThing,
    deleteThing,
  } = ctx;

  const [name, setName] = useState<string>(currentlyEditingThing?.name ?? "");
  const [colour, setColour] = useState<CalendarColour>(
    currentlyEditingThing?.colour ?? "mediumBlue",
  );

  // Update local state when currentlyEditingThing changes
  useEffect(() => {
    if (currentlyEditingThing) {
      setName(currentlyEditingThing.name);
      setColour(currentlyEditingThing.colour);
    }
  }, [currentlyEditingThing]);

  // Save thing name and color whenever they change
  const handleThingNameChange = (newName: string) => {
    setName(newName);
    if (currentlyEditingThing) {
      updateThing({ ...currentlyEditingThing, name: newName, colour });
    }
  };

  const handleThingColourChange = (newColour: CalendarColour) => {
    setColour(newColour);
    if (currentlyEditingThing) {
      updateThing({ ...currentlyEditingThing, name, colour: newColour });
    }
  };

  const onDelete = () => {
    if (currentlyEditingThing) {
      setCurrentlyEditingThing(null);
      deleteThing({ ...currentlyEditingThing, name });
    }
  };

  return (
    <Dialog
      open={currentlyEditingThing !== null}
      onClose={() => setCurrentlyEditingThing(null)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Thing</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <CalendarColourPicker
            colour={colour}
            onChange={handleThingColourChange}
          />
          <TextField
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleThingNameChange(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLElement).blur();
              }
            }}
            label="Thing Name"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <EventsTable />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => onDelete()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
