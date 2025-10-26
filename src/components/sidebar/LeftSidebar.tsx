import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { NavLink } from "react-router";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { AuthAvatar } from "../auth/AuthAvatar.tsx";
import { CalendarsList } from "./CalendarsList.tsx";
import { ThingsList } from "./ThingsList.tsx";

export const LeftSidebar = () => {
  const { data: calendars } = useCalendars();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ListItemButton component={NavLink} to="/home">
        Calendar
      </ListItemButton>
      <ThingsList />
      {calendars.length > 1 && <CalendarsList />}

      <AuthAvatar />

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
          <NavLink to="/404">404</NavLink>
        </ListItem>
      </List>
    </Box>
  );
};
