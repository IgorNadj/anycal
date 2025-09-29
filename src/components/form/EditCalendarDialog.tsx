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
import { CalendarColourPicker } from "./CalendarColourPicker.tsx";
import type { CalendarColour } from "../../types.ts";
import { EventsTable } from "../table/EventsTable.tsx";
import { useUpdateCalendar } from "../../hooks/useUpdateCalendar.ts";
import { useDeleteCalendar } from "../../hooks/useDeleteCalendar.ts";

export const EditCalendarDialog = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingCalendar, setCurrentlyEditingCalendar } = ctx;

  const { mutate: updateCalendar } = useUpdateCalendar();
  const { mutate: deleteCalendar } = useDeleteCalendar();

  const [name, setName] = useState<string>(
    currentlyEditingCalendar?.name ?? "",
  );
  const [colour, setColour] = useState<CalendarColour>(
    currentlyEditingCalendar?.colour ?? "blue_400",
  );

  // Update local state when currentlyEditingCalendar changes
  useEffect(() => {
    if (currentlyEditingCalendar) {
      setName(currentlyEditingCalendar.name);
      setColour(currentlyEditingCalendar.colour);
    }
  }, [currentlyEditingCalendar]);

  // Save calendar name and colour whenever they change
  const handleCalendarNameChange = (newName: string) => {
    setName(newName);
    if (currentlyEditingCalendar) {
      updateCalendar({ ...currentlyEditingCalendar, name: newName, colour });
    }
  };

  const handleCalendarColourChange = (newColour: CalendarColour) => {
    setColour(newColour);
    if (currentlyEditingCalendar) {
      updateCalendar({ ...currentlyEditingCalendar, name, colour: newColour });
    }
  };

  const onDelete = () => {
    if (currentlyEditingCalendar) {
      setCurrentlyEditingCalendar(null);
      deleteCalendar({ ...currentlyEditingCalendar, name });
    }
  };

  return (
    <Dialog
      open={currentlyEditingCalendar !== null}
      onClose={() => setCurrentlyEditingCalendar(null)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Calendar</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <CalendarColourPicker
            colour={colour}
            onChange={handleCalendarColourChange}
          />
          <TextField
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleCalendarNameChange(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLElement).blur();
              }
            }}
            label="Calendar Name"
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
