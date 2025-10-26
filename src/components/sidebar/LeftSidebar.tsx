import { Box, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { AuthAvatar } from "../auth/AuthAvatar.tsx";
import { CalendarsList } from "./CalendarsList.tsx";
import { ThingsList } from "./ThingsList.tsx";

export const LeftSidebar = () => {
  const onNewThingPress = () => {
    // const newThingUuid = uuidv4();
    // 1. create new thing, store as a draft
    // 2. navigate to /things/:uuid
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Add anything to your calendar.
        </Typography>
      </Box>

      <List>
        <ListItem>
          <NavLink to="/">Index</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/home">Home (logged in)</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/welcome">Home (logged out)</NavLink>
        </ListItem>
        <ListItem>
          <button onClick={onNewThingPress}>+</button>
        </ListItem>
        <ListItem>
          <NavLink to={`/thing/abc`}>View Thing: abc</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/404">404</NavLink>
        </ListItem>
      </List>
      <ThingsList />
      <CalendarsList />
      <AuthAvatar />
    </Box>
  );
};
