import { Event } from "../../types/types.ts";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { CALENDAR_COLOURS } from "../../constants.ts";

export const EventChip = ({ event }: { event: Event }) => {
  const ctx = useContext(AppContext);
  const { things, setCurrentlyEditingEvent } = ctx;

  const thing = things.find((thing) => thing.uuid === event.thingUuid);
  if (!thing) {
    return null;
  }

  return (
    <Chip
      sx={{ backgroundColor: CALENDAR_COLOURS[thing.colour] }}
      label={event.name}
      onClick={() => setCurrentlyEditingEvent(event)}
    />
  );
};
