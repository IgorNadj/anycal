import { Add } from "@mui/icons-material";
import { Box, IconButton, List, ListItemButton, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { useCreateThing } from "../../hooks/useCreateThing.ts";
import { useThings } from "../../hooks/useThings.ts";
import type { Calendar, Thing } from "../../types.ts";
import { getThingsForCalendar } from "../../utils.ts";

type Props = {
  calendar: Calendar;
};

export const ThingsList = ({ calendar }: Props) => {
  const { data: allThings } = useThings();
  const things = getThingsForCalendar(calendar, allThings);

  const { mutate: createThing } = useCreateThing();

  const { data: calendars } = useCalendars();
  const [firstCalendar] = calendars;

  const navigate = useNavigate();

  let params = useParams();
  const selectedThingUuid = params.thingUuid;

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
            selected={thing.uuid === selectedThingUuid}
            component={Link}
            to={`/things/${thing.uuid}`}
          >
            {thing.name || "Unnamed"}
          </ListItemButton>
        ))}
      </List>
    </>
  );
};
