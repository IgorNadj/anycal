import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { deleteCalendarAction } from "../actions/deleteCalendarAction.ts";
import { getAuth } from "../getAuth.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

export const useDeleteCalendar = () => {
  const queryClient = useQueryClient();
  const auth = getAuth();

  return useMutation({
    mutationFn: async (calendar: Calendar) => {
      if (auth.isLoggedIn) {
        return deleteCalendarAction(calendar);
      } else {
        GuestDataStore.calendars.delete(calendar);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["calendars"] });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
