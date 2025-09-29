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
      <DialogTitle>Create Calendar</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <CalendarColourPicker colour={colour} onChange={setColour} />
        </Box>
        <TextField
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Calendar Name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim().length > 0) {
              onCreate();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onCreate} disabled={name.trim().length === 0}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
