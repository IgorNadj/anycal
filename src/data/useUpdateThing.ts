import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Thing } from "../types.ts";
import { updateThingAction } from "../actions/updateThingAction.ts";

export const useUpdateThing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (thing: Thing) => updateThingAction(thing),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};
