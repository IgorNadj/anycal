import { AppContext } from "../state/AppContext.tsx";
import { useContext } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CALENDAR_COLOURS } from "../constants.ts";

export const ThingsList = () => {
  const ctx = useContext(AppContext);
  const { things } = ctx;

  return (
    <>
      <List>
        {things.map((thing) => (
          <ListItem key={thing.uuid} disablePadding>
            <ListItemButton dense disableRipple>
              <ListItemIcon>
                <Checkbox
                  checked={true}
                  disableRipple
                  style={{
                    color: CALENDAR_COLOURS[thing.colour],
                  }}
                />
              </ListItemIcon>
              <ListItemText>{thing.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
