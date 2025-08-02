import { AppContext } from "../state/AppContext.tsx";
import { useContext } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CALENDAR_COLOURS } from "../constants.ts";
import type { Thing } from "../types.ts";
import { useUpdateThing } from "../data/useUpdateThing.ts";
import { useThings } from "../data/useThings.ts";
import { useUser } from "../hooks/useUser.ts";

export const ThingsList = () => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingThing } = ctx;

  const user = useUser();
  const { data: things } = useThings(user);
  const { mutate: updateThing } = useUpdateThing();

  const setThingVisible = (thing: Thing, visible: boolean) => {
    updateThing({ ...thing, visible });
  };

  return (
    <>
      <List>
        {things.map((thing) => (
          <ListItem key={thing.uuid} disablePadding>
            <ListItemIcon>
              <Checkbox
                checked={thing.visible}
                sx={{
                  color: CALENDAR_COLOURS[thing.colour],
                  "&.Mui-checked": {
                    color: CALENDAR_COLOURS[thing.colour],
                  },
                }}
                onChange={(e) => setThingVisible(thing, e.target.checked)}
              />
            </ListItemIcon>
            <ListItemText onClick={() => setCurrentlyEditingThing(thing)}>
              {thing.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
