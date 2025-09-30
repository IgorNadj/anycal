import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { CalendarColourPicker } from "./CalendarColourPicker.tsx";
import type { CalendarColour } from "../../types.ts";
import { useUpdateCalendar } from "../../hooks/useUpdateCalendar.ts";

export const EditCalendarDialog = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingCalendar, setCurrentlyEditingCalendar } = ctx;

  const { mutate: updateCalendar } = useUpdateCalendar();

  const [name, setName] = useState<string>(
    currentlyEditingCalendar?.name ?? "",
  );
  const [colour, setColour] = useState<CalendarColour>(
    currentlyEditingCalendar?.colour ?? "blue_400",
  );

  // Sync local state when switching which calendar is being edited
  useEffect(() => {
    if (currentlyEditingCalendar) {
      setName(currentlyEditingCalendar.name);
      setColour(currentlyEditingCalendar.colour);
    }
  }, [currentlyEditingCalendar]);

  const onSave = () => {
    if (!currentlyEditingCalendar) return;
    updateCalendar({ ...currentlyEditingCalendar, name, colour });
    setCurrentlyEditingCalendar(null);
  };

  return (
    <Dialog
      open={currentlyEditingCalendar !== null}
      onClose={() => setCurrentlyEditingCalendar(null)}
      maxWidth="md"
      fullWidth
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <DialogTitle>Edit Calendar</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <CalendarColourPicker colour={colour} onChange={setColour} />
            <TextField
              variant="outlined"
              sx={{ width: "100%", mt: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              required
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
