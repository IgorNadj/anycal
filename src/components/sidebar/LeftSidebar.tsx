import { Settings } from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink, useLocation } from "react-router";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { AddThing } from "./AddThing.tsx";
import { AppLogo } from "./AppLogo.tsx";
import { CalAndThingsSection } from "./CalAndThingsSection.tsx";

export const LeftSidebar = () => {
  const { data: calendars } = useCalendars();

  const location = useLocation();

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
            <Box sx={{ marginTop: 2, marginBottom: 4, paddingLeft: 2 }}>
              <AddThing />
            </Box>

            {calendars.map((calendar) => (
              <CalAndThingsSection calendar={calendar} key={calendar.uuid} />
            ))}
          </Box>
          <List dense sx={{ paddingTop: 2 }}>
            <ListItemButton
              component={NavLink}
              to={`/app/settings`}
              selected={location.pathname === "/app/settings"}
              disableRipple
            >
              <ListItemIcon sx={{ minWidth: 35 }}>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
