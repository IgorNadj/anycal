import { useQuery } from "@tanstack/react-query";
import { getEventsAction } from "../actions/getEventsAction.ts";
import { User } from "../types.ts";

export const useEvents = (user: User) => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsAction(user),
    initialData: [],
  });
};
