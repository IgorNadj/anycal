import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "../types/types.ts";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Event, unknown>({
    mutationFn: (event: Event) => {
      return fetch("http://localhost:3000/api/event", {
        method: "post",
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
