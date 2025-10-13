import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getEventsAction } from "../actions/getEventsAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";

export const useEvents = () => {
  const { userUuid } = useContext(AuthContext);

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
