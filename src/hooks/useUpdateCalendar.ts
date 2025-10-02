import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { updateCalendarAction } from "../actions/updateCalendarAction.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";
import { useAuth } from "./useAuth.ts";

export const useUpdateCalendar = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: async (calendar: Calendar) => {
      if (auth.state.isLoggedIn) {
        return updateCalendarAction(calendar);
      } else {
        GuestDataStore.calendars.update(calendar);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
  });
};
