import { Event } from "../../types/types.ts";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";

export const EventChip = ({ event }: { event: Event }) => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingEvent } = ctx;

  return (
    <Chip label={event.name} onClick={() => setCurrentlyEditingEvent(event)} />
  );
};
