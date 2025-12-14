import { CalendarMonth, Settings } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { NavLink, useLocation, useParams } from "react-router";
import { CAL_HEADER_HEIGHT } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { useEventsWithSpecificDate } from "../../hooks/useEventsWithSpecificDate.ts";
import { StateContext } from "../../providers/StateContext.tsx";
import { MiniCalendar } from "../calendar-mini/MiniCalendar.tsx";
import { AddThing } from "./AddThing.tsx";
import { CalAndThingsSection } from "./CalAndThingsSection.tsx";

export const LeftSidebar = () => {
  const { data: calendars } = useCalendars();
  const [firstCalendar] = calendars;
  const firstCalendarUuid = firstCalendar?.uuid;

  const location = useLocation();

  const { currentDate } = useContext(StateContext);

  const events = useEventsWithSpecificDate();

  let params = useParams();
  const selectedCalendarUuid = params.calendarUuid;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        minWidth: 250,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e7f1f8",
      }}
    >
      <Box sx={{ height: `calc(100vh - ${CAL_HEADER_HEIGHT}px)`, overflowY: "auto" }}>
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
            <ListItem sx={{ paddingX: 0 }}>
              {false && <MiniCalendar currentDate={currentDate} events={events} />}
            </ListItem>

            <ListItemButton
              component={NavLink}
              to={`/app/cal/${firstCalendarUuid}`}
              selected={selectedCalendarUuid === firstCalendarUuid}
              sx={{ marginBottom: 4 }}
              disableRipple
            >
              <ListItemIcon sx={{ minWidth: 35 }}>
                <CalendarMonth fontSize="small" />
              </ListItemIcon>
              <ListItemText>{"Calendar"}</ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={{ marginTop: 2 }}
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
