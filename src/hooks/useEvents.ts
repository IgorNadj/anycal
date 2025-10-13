import { useQuery } from "@tanstack/react-query";
import { getEventsAction } from "../actions/getEventsAction.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useEvents = () => {
  const { userUuid } = useContext(AppContext);

  return useQuery({
    queryKey: [userUuid, "events"],
    queryFn: async () => {
      if (!userUuid) return [];
      return getEventsAction(userUuid);
    },
    initialData: [],
    enabled: !!userUuid,
  });
};
