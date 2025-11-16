import CircleIcon from "@mui/icons-material/Circle";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useParams } from "react-router";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useThings } from "../../hooks/useThings.ts";
import type { Calendar } from "../../types.ts";
import { getThingsForCalendar } from "../../utils.ts";

type Props = {
  calendar: Calendar;
  showHeader?: boolean;
};

export const CalAndThingsSection = ({ calendar, showHeader = false }: Props) => {
  const { data: allThings } = useThings();
  const things = getThingsForCalendar(calendar, allThings);

  let params = useParams();
  const selectedThingUuid = params.thingUuid;

  return (
    <>
      <List
        dense
        subheader={showHeader ? <ListSubheader>My Things</ListSubheader> : undefined}
      >
        {things.map((thing) => (
          <ListItemButton
            key={thing.uuid}
            selected={thing.uuid === selectedThingUuid}
            component={Link}
            to={`/app/things/${thing.uuid}`}
            disableRipple
          >
            <ListItemIcon sx={{ minWidth: 35 }}>
              <CircleIcon
                fontSize="small"
                sx={{ color: CALENDAR_COLOURS[thing.colour] }}
              />
            </ListItemIcon>
            <ListItemText>{thing.niceName || thing.name || "New Thing"}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </>
  );
};
