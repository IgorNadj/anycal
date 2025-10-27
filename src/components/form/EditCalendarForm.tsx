import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { Calendar } from "../../types.ts";

type Props = {
  calendar: Calendar;
  onSave: (updatedCalendar: Calendar) => void;
};

export const EditCalendarForm = ({ calendar, onSave }: Props) => {
  const [name, setName] = useState<string>(calendar.name);

  const onSaveClick = () => {
    onSave({ ...calendar, name });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSaveClick();
      }}
    >
      <Box sx={{ mb: 3 }}>
        <TextField
          variant="outlined"
          sx={{ width: "100%", mt: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          required
        />
      </Box>
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
};
