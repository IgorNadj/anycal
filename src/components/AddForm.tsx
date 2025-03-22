import { Button, TextField, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { useState } from "react";
import { Thing } from "../types/types.ts";
import { v4 as uuidv4 } from "uuid";

type AddFormProps = {
  onSubmit: (thing: Thing) => void;
};

export const AddForm = ({ onSubmit }: AddFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("");

  return (
    <>
      <Typography variant="h6">What</Typography>
      <TextField
        variant="outlined"
        sx={{ width: "100%" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Typography variant="h6">When</Typography>
      <DateCalendar value={date} onChange={setDate} />

      <Button
        variant="contained"
        onClick={() => onSubmit({ name, date, uuid: uuidv4() })}
      >
        Add
      </Button>
    </>
  );
};
