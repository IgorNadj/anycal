import { useQuery } from "@tanstack/react-query";
import { getCalendarsAction } from "../actions/getCalendarsAction.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useCalendars = () => {
  const { userUuid } = useContext(AppContext);

  return useQuery({
    queryKey: [userUuid, "calendars"],
    queryFn: async () => {
      if (!userUuid) {
        return [];
      }
      return getCalendarsAction(userUuid);
    },
    initialData: [],
    enabled: !!userUuid,
  });
};
