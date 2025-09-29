import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CalendarEvent } from "../types.ts";
import { deleteEventAction } from "../actions/deleteEventAction.ts";
import { getAuth } from "../getAuth.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const auth = getAuth();

  return useMutation({
    mutationFn: async (event: CalendarEvent) => {
      if (auth.isLoggedIn) {
        return deleteEventAction(event);
      } else {
        GuestDataStore.events.delete(event);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
