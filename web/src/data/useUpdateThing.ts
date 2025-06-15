import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Thing } from "@anycal/types";

export const useUpdateThing = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Thing, unknown>({
    mutationFn: (thing: Thing) => {
      return fetch(`http://localhost:3000/api/thing/${thing.uuid}`, {
        method: "put",
        body: JSON.stringify(thing),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};
