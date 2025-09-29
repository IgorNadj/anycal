import { useQuery } from "@tanstack/react-query";
import { getEventsAction } from "../actions/getEventsAction.ts";
import { getAuth } from "../getAuth.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

export const useEvents = () => {
  const auth = getAuth();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (auth.isLoggedIn) {
        return getEventsAction(auth.userUuid);
      } else {
        return GuestDataStore.events.get();
      }
    },
    initialData: [],
  });
};
