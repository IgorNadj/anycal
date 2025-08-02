import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Event } from "../types.ts";
import { createEventAction } from "../actions/createEventAction.ts";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: Event) => createEventAction(event),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
