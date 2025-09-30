import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { useUpdateEvent } from "../../hooks/useUpdateEvent.ts";
import { useDeleteEvent } from "../../hooks/useDeleteEvent.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import type { Calendar } from "../../types.ts";
import { CalendarPicker } from "./CalendarPicker.tsx";

export const EditEventDialog = () => {
  const ctx = useContext(AppContext);
  const { currentlyEditingEvent, setCurrentlyEditingEvent } = ctx;

  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();

  const { data: calendars } = useCalendars();

  const [date, setDate] = useState<Date>(
    currentlyEditingEvent?.date ?? new Date(),
  );

  const [name, setName] = useState<string>(currentlyEditingEvent?.name ?? "");
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null);

  // Sync selected calendar when dialog opens or calendars change
  useEffect(() => {
    if (!currentlyEditingEvent) return;
    if (!calendars || calendars.length === 0) return;
    const cal = calendars.find((c) => c.uuid === currentlyEditingEvent.calendarUuid) ?? null;
    setSelectedCalendar(cal);
  }, [currentlyEditingEvent, calendars]);

  const onSave = () => {
    if (currentlyEditingEvent) {
      const calendarUuid = selectedCalendar?.uuid ?? currentlyEditingEvent.calendarUuid;
      updateEvent({ ...currentlyEditingEvent, name, date, calendarUuid });
      setCurrentlyEditingEvent(null);
    }
  };

  const onDelete = () => {
    if (currentlyEditingEvent) {
      setCurrentlyEditingEvent(null);
      deleteEvent({ ...currentlyEditingEvent, name, date });
    }
  };

  return (
    <Dialog
      open={currentlyEditingEvent !== null}
      onClose={() => setCurrentlyEditingEvent(null)}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
            <DatePicker value={date} onChange={(date) => date && setDate(date)} />
            {calendars.length > 1 ? (
              <CalendarPicker
                selectedCalendar={selectedCalendar}
                onChangeCalendar={setSelectedCalendar}
                required
              />
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button variant="contained" onClick={() => onDelete()}>
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
