import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCreateCalendar } from "../../hooks/useCreateCalendar.ts";
import { AuthContext } from "../../providers/AuthContext.tsx";
import { StateContext } from "../../providers/StateContext.tsx";
import type { Calendar } from "../../types.ts";

export const AddCalendarDialog = () => {
  const { isCreatingCalendar, setIsCreatingCalendar } = useContext(StateContext);
  const { userUuid } = useContext(AuthContext);

  const { mutate: createCalendar } = useCreateCalendar();

  const [name, setName] = useState<string>("");

  const onClose = () => {
    setIsCreatingCalendar(false);
    setName("");
  };

  const onCreate = () => {
    if (!userUuid) return;
    const newCalendar: Calendar = {
      uuid: uuidv4(),
      name,
      userUuid: userUuid,
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
