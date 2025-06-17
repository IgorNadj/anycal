import { useQuery } from "@tanstack/react-query";
import { getEventsAction } from "../actions/getEventsAction.ts";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsAction(),
    initialData: [],
  });
};
