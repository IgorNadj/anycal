import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCalendarsAction } from "../actions/getCalendarsAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";

export const useCalendars = () => {
  const { userUuid } = useContext(AuthContext);

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
