import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "../types.ts";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Event, unknown>({
    mutationFn: (event: Event) => {
      return fetch(`http://localhost:3000/api/event/${event.uuid}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
