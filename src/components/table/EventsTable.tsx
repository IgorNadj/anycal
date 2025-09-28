import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { EditableEventRow } from "./EditableEventRow.tsx";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useMemo } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { v4 as uuidv4 } from "uuid";
import type { CalendarEvent } from "../../types.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useEvents } from "../../data/useEvents.ts";
import { useCreateEvent } from "../../data/useCreateEvent.ts";
import { getEventsForCalendar } from "../../utils.ts";

export const EventsTable = () => {
  const { currentlyEditingCalendar } = useContext(AppContext);

  const user = useUser();
  const { data: allEvents } = useEvents(user);
  const { mutate: createEvent } = useCreateEvent();

  const events = useMemo(() => {
    if (!currentlyEditingCalendar) return [];
    return getEventsForCalendar(currentlyEditingCalendar, allEvents);
  }, [allEvents, currentlyEditingCalendar]);

  const handleAddEvent = () => {
    if (!currentlyEditingCalendar) return;

    const newEvent: CalendarEvent = {
      uuid: uuidv4(),
      name: "New Event",
      date: new Date(),
      calendarUuid: currentlyEditingCalendar.uuid,
    };

    createEvent(newEvent);
  };

  if (!currentlyEditingCalendar) return null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Events</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <EditableEventRow key={event.uuid} event={event} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
