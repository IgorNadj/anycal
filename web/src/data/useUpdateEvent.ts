import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "../types.ts";
import { createEventAction } from "../actions/createEventAction.ts";

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: Event) => createEventAction(event),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
