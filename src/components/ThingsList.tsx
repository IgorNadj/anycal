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
  const { things, saveThing } = ctx;

  const setThingVisible = (thing: Thing, visible: boolean) => {
    saveThing({ ...thing, visible });
  };

  return (
    <>
      <List>
        {things.map((thing) => (
          <ListItem key={thing.uuid} disablePadding>
            <ListItemIcon>
              <Checkbox
                checked={thing.visible}
                style={{
                  color: CALENDAR_COLOURS[thing.colour],
                }}
                onChange={(e) => setThingVisible(thing, e.target.checked)}
              />
            </ListItemIcon>
            <ListItemText>{thing.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
