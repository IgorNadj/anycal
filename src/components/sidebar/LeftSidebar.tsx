import { Box, List, ListItem } from "@mui/material";
import { NavLink } from "react-router";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { AddThing } from "./AddThing.tsx";
import { AppLogo } from "./AppLogo.tsx";
import { Section } from "./Section.tsx";

export const LeftSidebar = () => {
  const { data: calendars } = useCalendars();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: SIDEBAR_WIDTH,
        minWidth: SIDEBAR_WIDTH,
        maxWidth: SIDEBAR_WIDTH,
      }}
    >
      <Box sx={{ height: HEADER_HEIGHT }}>
        <AppLogo />
      </Box>

      <Box sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflowY: "auto" }}>
        <Box
          sx={{
            height: "100%",
            paddingBottom: 5,
            paddingX: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ marginTop: 2, marginBottom: 2, paddingLeft: 1 }}>
              <AddThing />
            </Box>

            {calendars.map((calendar) => (
              <Section calendar={calendar} key={calendar.uuid} />
            ))}
          </Box>
          <List sx={{ paddingTop: 2, paddingBottom: 5 }}>
            <ListItem>
              <NavLink to="/app/settings">Settings</NavLink>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
