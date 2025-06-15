import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@anycal/types";

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Event, unknown>({
    mutationFn: (event: Event) => {
      return fetch(`http://localhost:3000/api/event/${event.uuid}`, {
        method: "put",
        body: JSON.stringify(event),
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
