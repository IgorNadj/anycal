import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/types.ts";
import { getEventsAction } from "./getEventsAction.ts";

export type ProcessedEvent = Event;

export const useEvents = () => {
  return useQuery<Event[], Error, Event[], [string]>({
    queryKey: ["events"],
    queryFn: async () => {
      const events = await getEventsAction();
      return events;
    },
    initialData: [],
  });
};
