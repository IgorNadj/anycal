import { Box, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { CalendarsList } from "./CalendarsList.tsx";

export const LeftSidebar = () => {
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
          <NavLink to="/404">404</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/calendar">Calendar</NavLink>
        </ListItem>
      </List>
      <CalendarsList />
    </Box>
  );
};
