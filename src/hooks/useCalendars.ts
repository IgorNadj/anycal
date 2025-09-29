import { useQuery } from "@tanstack/react-query";
import { getCalendarsAction } from "../actions/getCalendarsAction.ts";
import { getAuth } from "../getAuth.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

export const useCalendars = () => {
  const auth = getAuth();

  return useQuery({
    queryKey: ["calendars"],
    queryFn: async () => {
      if (auth.isLoggedIn) {
        return getCalendarsAction(auth.userUuid);
      } else {
        return GuestDataStore.calendars.get();
      }
    },
    initialData: [],
  });
};
