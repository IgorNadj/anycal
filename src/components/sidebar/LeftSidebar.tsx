import { Box, List, ListItem } from "@mui/material";
import { NavLink } from "react-router";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { AuthAvatar } from "../auth/AuthAvatar.tsx";
import { Section } from "./Section.tsx";

export const LeftSidebar = () => {
  const { data: calendars } = useCalendars();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {calendars.map((calendar) => (
        <Section calendar={calendar} key={calendar.uuid} />
      ))}

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
