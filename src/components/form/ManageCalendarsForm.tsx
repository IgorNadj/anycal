import { Add, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { useCreateCalendar } from "../../hooks/useCreateCalendar.ts";
import { useDeleteCalendar } from "../../hooks/useDeleteCalendar.ts";
import { useUpdateCalendar } from "../../hooks/useUpdateCalendar.ts";
import { AuthContext } from "../../providers/AuthContext.tsx";
import type { Calendar } from "../../types.ts";
import { EditCalendarForm } from "./EditCalendarForm.tsx";
import { TextFieldWithCopyButton } from "./TextFieldWithCopyButton.tsx";

export const ManageCalendarsForm = () => {
  const { userUuid } = useContext(AuthContext);

  const { data: calendars } = useCalendars();

  const { mutate: createCalendar, isPending: isCreateCalendarPending } =
    useCreateCalendar();
  const { mutate: deleteCalendar } = useDeleteCalendar();
  const { mutate: updateCalendar } = useUpdateCalendar();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCalendar, setMenuCalendar] = useState<Calendar | null>(null);

  const [calendarToEdit, setCalendarToEdit] = useState<Calendar | null>(null);
  const [calendarToDelete, setCalendarToDelete] = useState<Calendar | null>(null);

  const menuOpen = Boolean(menuAnchorEl);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, calendar: Calendar) => {
    setMenuAnchorEl(e.currentTarget);
    setMenuCalendar(calendar);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setMenuCalendar(null);
  };

  const confirmDelete = () => {
    if (!calendarToDelete) return;
    deleteCalendar(calendarToDelete);

    setCalendarToDelete(null);
  };

  const onClickAdd = () => {
    if (!userUuid) return null;
    const newCalendar: Calendar = {
      uuid: uuidv4(),
      name: "New Calendar",
      userUuid: userUuid,
    };
    createCalendar(newCalendar);
  };

  return (
    <>
      <Box sx={{ marginTop: 5 }}>
        <Button onClick={onClickAdd} loading={isCreateCalendarPending} variant="outlined">
          <Add />
          Add a new calendar
        </Button>
      </Box>

      <Box>
        {calendars.map((calendar) => (
          <Paper key={calendar.uuid} sx={{ marginY: 5, padding: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5" sx={{ flex: 1 }}>
                {calendar.name}
              </Typography>
              <IconButton
                sx={{}}
                edge="end"
                className="calendar-menu-btn"
                onClick={(e) => openMenu(e as any, calendar)}
              >
                <MoreVert />
              </IconButton>
              <Divider />
            </Box>
            <Box>
              <Typography variant="h6">Subscribe to this calendar</Typography>
              <Box>
                <Typography sx={{ mb: 2 }}>
                  You can subscribe to this Calendar in your calendar app with the
                  following url:
                </Typography>
                <Box>
                  <TextFieldWithCopyButton
                    value={`${window.location.origin}/subscribe?uuid=${calendar.uuid}`}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            if (menuCalendar) setCalendarToEdit(menuCalendar);
            closeMenu();
          }}
        >
          Edit
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

      <Dialog open={calendarToEdit !== null} onClose={() => setCalendarToEdit(null)}>
        <DialogTitle>Edit calendar</DialogTitle>
        <DialogContent>
          {calendarToEdit && (
            <EditCalendarForm
              calendar={calendarToEdit}
              onSave={(updatedCalendar) => updateCalendar(updatedCalendar)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
