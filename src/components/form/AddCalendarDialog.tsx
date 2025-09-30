import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { CalendarColourPicker } from "./CalendarColourPicker.tsx";
import type { CalendarColour, Calendar } from "../../types.ts";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "../../getAuth.ts";
import { useCreateCalendar } from "../../hooks/useCreateCalendar.ts";

export const AddCalendarDialog = () => {
  const { isCreatingCalendar, setIsCreatingCalendar } = useContext(AppContext);

  const { mutate: createCalendar } = useCreateCalendar();

  const [name, setName] = useState<string>("");
  const [colour, setColour] = useState<CalendarColour>("blue_400");

  const auth = getAuth();

  const onClose = () => {
    setIsCreatingCalendar(false);
    setName("");
    setColour("blue_400");
  };

  const onCreate = () => {
    const userUuid = auth.isLoggedIn ? auth.userUuid : auth.guestUuid;
    const newCalendar: Calendar = {
      uuid: uuidv4(),
      name,
      colour,
      visible: true,
      userUuid,
    };
    createCalendar(newCalendar);
    onClose();
  };

  return (
    <Dialog open={isCreatingCalendar} onClose={onClose} maxWidth="sm" fullWidth>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate();
        }}
      >
        <DialogTitle>Add a new Calendar</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <CalendarColourPicker colour={colour} onChange={setColour} />
          </Box>
          <TextField
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            required
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
