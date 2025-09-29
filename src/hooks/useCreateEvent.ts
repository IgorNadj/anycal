import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CalendarEvent } from "../types.ts";
import { createEventAction } from "../actions/createEventAction.ts";
import { getAuth } from "../getAuth.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const auth = getAuth();

  return useMutation({
    mutationFn: async (event: CalendarEvent) => {
      if (auth.isLoggedIn) {
        return createEventAction(event);
      } else {
        GuestDataStore.events.create(event);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
