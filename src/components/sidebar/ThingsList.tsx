import { Add } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { useCreateThing } from "../../hooks/useCreateThing.ts";
import { useThings } from "../../hooks/useThings.ts";
import { StateContext } from "../../providers/StateContext.tsx";
import type { Thing } from "../../types.ts";

export const ThingsList = () => {
  const { data: things } = useThings();
  const { mutate: createThing } = useCreateThing();

  const { data: calendars } = useCalendars();
  const [firstCalendar] = calendars;

  const navigate = useNavigate();

  const { currentlyEditingThing, setCurrentlyEditingThing } = useContext(StateContext);

  const onAddClick = () => {
    console.log("add clicked ");
    const newThing: Thing = {
      uuid: uuidv4(),
      visible: true,
      colour: "blue_400",
      calendarUuid: firstCalendar.uuid,
    };
    createThing(newThing);
    navigate(`/things/${newThing.uuid}`);
    setCurrentlyEditingThing(newThing);
  };

  const onClickThing = (thing: Thing) => {
    console.log("clicked ", thing);
    navigate(`/things/${thing.uuid}`);
    setCurrentlyEditingThing(thing);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ flex: 1 }} variant="h6">
          My Things
        </Typography>
        <IconButton onClick={() => onAddClick()}>
          <Add />
        </IconButton>
      </Box>

      <List>
        {things.map((thing) => (
          <ListItemButton
            key={thing.uuid}
            selected={thing.uuid === currentlyEditingThing?.uuid}
            onClick={() => onClickThing(thing)}
          >
            <ListItemText onClick={() => onClickThing(thing)}>
              {thing.name || "Unnamed"}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </>
  );
};
