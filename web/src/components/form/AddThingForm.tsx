import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../state/AppContext.tsx";
import { getFirstUnusedColour } from "../../utils.ts";

export const AddThingForm = () => {
  const ctx = useContext(AppContext);
  const { things, addNewThingToCalendar } = ctx;

  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("");

  const onCreateNewThing = () => {
    const newThing = {
      name,
      uuid: uuidv4(),
      colour: getFirstUnusedColour(things),
      visible: true,
    };
    const newEvent = { name, date, uuid: uuidv4(), thingUuid: newThing.uuid };
    addNewThingToCalendar(newThing, newEvent);
  };

  return (
    <>
      <DialogContent>
        <Typography variant="h6">What</Typography>
        <TextField
          variant="outlined"
          sx={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Typography variant="h6">When</Typography>
        <DatePicker value={date} onChange={(date) => date && setDate(date)} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onCreateNewThing()}>
          Add
        </Button>
      </DialogActions>
    </>
  );
};
