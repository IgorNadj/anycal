import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useThings } from "../../hooks/useThings.ts";
import { useUpdateThing } from "../../hooks/useUpdateThing.ts";
import type { Thing } from "../../types.ts";

export const ThingsList = () => {
  const { data: things } = useThings();
  const { mutate: updateThing } = useUpdateThing();

  const setThingVisible = (thing: Thing, visible: boolean) => {
    updateThing({ ...thing, visible });
  };

  const onClickThing = (thing: Thing) => {
    console.log("clicked ", thing);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ flex: 1 }} variant="h6">
          My Things
        </Typography>
      </Box>

      <List>
        {things.map((thing) => (
          <ListItem
            key={thing.uuid}
            disablePadding
            sx={{
              "&:hover .thing-menu-btn": { opacity: 1, pointerEvents: "auto" },
            }}
          >
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
            <ListItemText onClick={() => onClickThing(thing)}>{thing.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
