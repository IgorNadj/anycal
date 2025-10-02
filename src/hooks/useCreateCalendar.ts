import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { createCalendarAction } from "../actions/createCalendarAction.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";
import { useAuth } from "./useAuth.ts";

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: async (calendar: Calendar) => {
      if (auth.state.isLoggedIn) {
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
