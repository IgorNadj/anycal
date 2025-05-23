import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/types.ts";
import { getEventsAction } from "./getEventsAction.ts";

export type ProcessedEvent = Omit<Event, "date"> & {
  date: Date;
};

type SerializedEvent = Omit<Event, "date"> & {
  date: string;
};

export const useEvents = () => {
  return useQuery<ProcessedEvent[], Error, ProcessedEvent[], [string]>({
    queryKey: ["events"],
    queryFn: async () => {
      const serializedEvents = await getEventsAction();
      return serializedEvents.map((event: SerializedEvent) => ({
        ...event,
        date: new Date(event.date),
      }));
    },
    initialData: [],
  });
};
