import { Button, TextField, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../state/AppContext.tsx";

export const AddForm = () => {
  const ctx = useContext(AppContext);
  const { addNewThingToCalendar } = ctx;

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
        onClick={() => addNewThingToCalendar({ name, date, uuid: uuidv4() })}
      >
        Add
      </Button>
    </>
  );
};
