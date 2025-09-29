import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { createCalendarAction } from "../actions/createCalendarAction.ts";
import { getAuth } from "../getAuth.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();
  const auth = getAuth();

  return useMutation({
    mutationFn: async (calendar: Calendar) => {
      if (auth.isLoggedIn) {
        return createCalendarAction(calendar);
      } else {
        GuestDataStore.calendars.create(calendar);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
  });
};
