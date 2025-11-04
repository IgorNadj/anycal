import type { EventsWithSpecificDate } from "../types.ts";
import { useEvents } from "./useEvents.ts";

export const useEventsWithSpecificDate = () => {
  const { data: events } = useEvents();

  const eventsWithSpecificDate: EventsWithSpecificDate[] = events.filter(
    (event) => event.type === "NormalEvent" || event.type === "SubjectToChangeEvent",
  );

  return eventsWithSpecificDate;
};
