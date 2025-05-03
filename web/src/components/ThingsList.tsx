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
import { Thing } from "../types/types.ts";

export const ThingsList = () => {
  const ctx = useContext(AppContext);
  const { things, updateThing, setCurrentlyEditingThing } = ctx;

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
