import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CalendarEvent } from "../types.ts";
import { createEventAction } from "../actions/createEventAction.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";
import { useAuth } from "./useAuth.ts";

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: async (event: CalendarEvent) => {
      if (auth.state.isLoggedIn) {
        return createEventAction(event);
      } else {
        GuestDataStore.events.update(event);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
