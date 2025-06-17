import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Thing } from "../types.ts";
import { createThingAction } from "../actions/createThingAction.ts";

export const useCreateThing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (thing: Thing) => createThingAction(thing),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};
