import { AppContext } from "../state/AppContext.tsx";
import { useContext } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CALENDAR_COLOURS } from "../constants.ts";
import type { Calendar } from "../types.ts";
import { useUser } from "../hooks/useUser.ts";
import { useCalendars } from "../data/useCalendars.ts";
import { useUpdateCalendar } from "../data/useUpdateCalendar.ts";

export const CalendarsList = () => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingCalendar } = ctx;

  const user = useUser();
  const { data: calendars } = useCalendars(user);
  const { mutate: updateCalendar } = useUpdateCalendar();

  const setCalendarVisible = (calendar: Calendar, visible: boolean) => {
    updateCalendar({ ...calendar, visible });
  };

  return (
    <>
      <Typography variant="h6">My Calendars</Typography>
      <List>
        {calendars.map((calendar) => (
          <ListItem key={calendar.uuid} disablePadding>
            <ListItemIcon>
              <Checkbox
                checked={calendar.visible}
                sx={{
                  color: CALENDAR_COLOURS[calendar.colour],
                  "&.Mui-checked": {
                    color: CALENDAR_COLOURS[calendar.colour],
                  },
                }}
                onChange={(e) => setCalendarVisible(calendar, e.target.checked)}
              />
            </ListItemIcon>
            <ListItemText onClick={() => setCurrentlyEditingCalendar(calendar)}>
              {calendar.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
