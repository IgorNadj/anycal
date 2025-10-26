import { Add, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { CALENDAR_COLOURS } from "../constants.ts";
import { useCalendars } from "../hooks/useCalendars.ts";
import { useDeleteCalendar } from "../hooks/useDeleteCalendar.ts";
import { useUpdateCalendar } from "../hooks/useUpdateCalendar.ts";
import { StateContext } from "../providers/StateContext.tsx";
import type { Calendar } from "../types.ts";
import { TextFieldWithCopyButton } from "./form/TextFieldWithCopyButton.tsx";

export const CalendarsList = () => {
  const ctx = useContext(StateContext);
  const { setCurrentlyEditingCalendar, setIsCreatingCalendar } = ctx;

  const { data: calendars } = useCalendars();
  const { mutate: updateCalendar } = useUpdateCalendar();
  const { mutate: deleteCalendar } = useDeleteCalendar();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCalendar, setMenuCalendar] = useState<Calendar | null>(null);
  const [calendarToDelete, setCalendarToDelete] = useState<Calendar | null>(null);
  const [subscriptionCalendar, setSubscriptionCalendar] = useState<Calendar | null>(null);

  const menuOpen = Boolean(menuAnchorEl);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, calendar: Calendar) => {
    setMenuAnchorEl(e.currentTarget);
    setMenuCalendar(calendar);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setMenuCalendar(null);
  };

  const setCalendarVisible = (calendar: Calendar, visible: boolean) => {
    updateCalendar({ ...calendar, visible });
  };

  const confirmDelete = () => {
    if (!calendarToDelete) return;
    deleteCalendar(calendarToDelete);
    setCalendarToDelete(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ flex: 1 }} variant="h6">
          My Calendars
        </Typography>
        <IconButton onClick={() => setIsCreatingCalendar(true)}>
          <Add />
        </IconButton>
      </Box>

      <List>
        {calendars.map((calendar) => (
          <ListItem
            key={calendar.uuid}
            disablePadding
            sx={{
              "&:hover .calendar-menu-btn": { opacity: 1, pointerEvents: "auto" },
            }}
            secondaryAction={
              <IconButton
                edge="end"
                className="calendar-menu-btn"
                sx={{
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "opacity 0.15s",
                  "&:focus-visible": { opacity: 1, pointerEvents: "auto" },
                }}
                onClick={(e) => openMenu(e as any, calendar)}
              >
                <MoreVert />
              </IconButton>
            }
          >
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

      <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            if (menuCalendar) setCurrentlyEditingCalendar(menuCalendar);
            closeMenu();
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (menuCalendar) setSubscriptionCalendar(menuCalendar);
            closeMenu();
          }}
        >
          Subscribe to this Calendar
        </MenuItem>
        <MenuItem
          disabled={calendars.length <= 1}
          onClick={() => {
            if (menuCalendar) setCalendarToDelete(menuCalendar);
            closeMenu();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={calendarToDelete !== null} onClose={() => setCalendarToDelete(null)}>
        <DialogTitle>Delete calendar?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{calendarToDelete?.name}"? This cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCalendarToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={subscriptionCalendar !== null}
        onClose={() => setSubscriptionCalendar(null)}
      >
        <DialogTitle>Subscribe to Calendar</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            You can add this Calendar to your calendar app with the following url:
          </Typography>
          <TextFieldWithCopyButton
            value={
              subscriptionCalendar
                ? `${window.location.origin}/subscribe?uuid=${subscriptionCalendar.uuid}`
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubscriptionCalendar(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
