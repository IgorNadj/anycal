'use client';

// src/components/form/EventsTable.tsx
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
import { Event } from "../../types/types.ts";

export const EventsTable = () => {
  const { events, createEvent, currentlyEditingThing } = useContext(AppContext);

  // Filter events for the current thing
  const thingEvents = useMemo(() => {
    if (!currentlyEditingThing) return [];
    return events.filter(
      (event) => event.thingUuid === currentlyEditingThing.uuid,
    );
  }, [events, currentlyEditingThing]);

  const handleAddEvent = () => {
    if (!currentlyEditingThing) return;

    const newEvent: Event = {
      uuid: uuidv4(),
      name: "New Event",
      date: new Date(),
      thingUuid: currentlyEditingThing.uuid,
    };

    // Create the event immediately
    createEvent(newEvent);
  };

  // Don't render anything if there's no currentlyEditingThing
  if (!currentlyEditingThing) return null;

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
            {thingEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              thingEvents.map((event) => (
                <EditableEventRow key={event.uuid} event={event} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
