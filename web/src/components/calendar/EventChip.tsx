import { Event } from "../../types.ts";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useThings } from "../../data/useThings.ts";
import { useUser } from "../../hooks/useUser.ts";

export const EventChip = ({ event }: { event: Event }) => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingEvent } = ctx;

  const user = useUser();
  const { data: things } = useThings(user);

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
