import { useQuery } from "@tanstack/react-query";
import { Event } from "@anycal/types";

type SerializedEvent = Omit<Event, "date"> & {
  date: string;
};

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/events");
      const asJson = await response.json();

      return asJson.map((event: SerializedEvent) => ({
        ...event,
        date: new Date(event.date),
      }));
    },
    initialData: [],
  });
};
