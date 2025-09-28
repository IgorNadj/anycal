import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CalendarEvent } from "../types.ts";
import { deleteEventAction } from "../actions/deleteEventAction.ts";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: CalendarEvent) => deleteEventAction(event),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
