import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Thing } from "../types/types.ts";

export const useDeleteThing = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Thing, unknown>({
    mutationFn: (thing: Thing) => {
      return fetch(`http://localhost:3000/api/thing/${thing.uuid}`, {
        method: "delete",
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
