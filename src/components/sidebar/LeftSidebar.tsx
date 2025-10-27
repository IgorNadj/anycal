import { Box, List, ListItem } from "@mui/material";
import { NavLink } from "react-router";
import { HEADER_HEIGHT } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { AppLogo } from "./AppLogo.tsx";
import { Section } from "./Section.tsx";

export const LeftSidebar = () => {
  const { data: calendars } = useCalendars();

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ height: HEADER_HEIGHT }}>
        <AppLogo />
      </Box>

      <Box sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflowY: "auto" }}>
        <Box sx={{ paddingBottom: 5 }}>
          <List>
            <ListItem>
              <NavLink to="/">Index</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/sign-in">Sign in</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/app/settings">Settings</NavLink>
            </ListItem>
          </List>
          {calendars.map((calendar) => (
            <Section calendar={calendar} key={calendar.uuid} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
