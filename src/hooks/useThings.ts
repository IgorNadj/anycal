import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getThingsAction } from "../actions/getThingsAction.ts";
import { StateContext } from "../providers/StateContext.tsx";

export const useThings = () => {
  const { currentlyEditingCalendar } = useContext(StateContext);

  const calendarUuid = currentlyEditingCalendar?.uuid;

  return useQuery({
    queryKey: [calendarUuid, "things"],
    queryFn: async () => {
      if (!calendarUuid) return [];
      return getThingsAction(calendarUuid);
    },
    initialData: [],
    enabled: !!calendarUuid,
  });
};
