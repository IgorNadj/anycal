import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { useCreateThing } from "../../hooks/useCreateThing.ts";
import { useThings } from "../../hooks/useThings.ts";
import type { Thing } from "../../types.ts";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { getFirstUnusedColour } from "../../utils.ts";

export const AddThing = () => {
  const { data: allThings } = useThings();
  const { mutate: createThing } = useCreateThing();

  const { data: calendars } = useCalendars();
  const [firstCalendar] = calendars;

  const navigate = useNavigate();

  const onAddClick = () => {
    const newThing: Thing = {
      uuid: uuidv4(),
      visible: true,
      colour: getFirstUnusedColour(allThings),
      calendarUuid: firstCalendar.uuid,
    };
    console.log("newThing", newThing);
    createThing(newThing);
    navigate(`/app/things/${newThing.uuid}`);
  };

  return (
    <IconButton size="large" onClick={() => onAddClick()}>
      <Add />
    </IconButton>
  );
};
