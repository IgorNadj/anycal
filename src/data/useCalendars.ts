import { useQuery } from "@tanstack/react-query";
import { getCalendarsAction } from "../actions/getCalendarsAction.ts";
import type { User } from "../types.ts";

export const useCalendars = (user: User) => {
  return useQuery({
    queryKey: ["calendars"],
    queryFn: () => getCalendarsAction(user),
    initialData: [],
  });
};
