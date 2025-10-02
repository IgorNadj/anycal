import { useQuery } from "@tanstack/react-query";
import { getEventsAction } from "../actions/getEventsAction.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";
import { useAuth } from "./useAuth.ts";

export const useEvents = () => {
  const auth = useAuth();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (auth.state.isLoggedIn) {
        return getEventsAction(auth.state.user.uuid);
      } else {
        return GuestDataStore.events.get();
      }
    },
    initialData: [],
  });
};
