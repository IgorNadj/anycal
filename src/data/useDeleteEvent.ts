import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Event } from "../types.ts";
import { deleteEventAction } from "../actions/deleteEventAction.ts";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: Event) => deleteEventAction(event),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
