import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Thing } from "../types.ts";
import { deleteThingAction } from "../actions/deleteThingAction.ts";

export const useDeleteThing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (thing: Thing) => deleteThingAction(thing),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};
