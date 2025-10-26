import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { updateThingAction } from "../actions/updateThingAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import type { Thing } from "../types.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useUpdateThing = () => {
  const queryClient = useQueryClient();
  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async (thing: Thing) => {
      return updateThingAction(thing);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "things"] });
    },
  });
};
