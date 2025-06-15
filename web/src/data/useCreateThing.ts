import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Thing } from "../types.ts";

export const useCreateThing = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Thing, unknown>({
    mutationFn: (thing: Thing) => {
      return fetch("http://localhost:3000/api/thing", {
        method: "post",
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
