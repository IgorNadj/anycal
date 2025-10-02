import { useQuery } from "@tanstack/react-query";
import { getCalendarsAction } from "../actions/getCalendarsAction.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";
import { useAuth } from "./useAuth.ts";

export const useCalendars = () => {
  const auth = useAuth();

  return useQuery({
    queryKey: ["calendars"],
    queryFn: async () => {
      if (auth.state.isLoggedIn) {
        return getCalendarsAction(auth.state.user.uuid);
      } else {
        return GuestDataStore.calendars.get();
      }
    },
    initialData: [],
  });
};
