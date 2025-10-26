import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { createThingAction } from "../actions/createThingAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import type { Thing } from "../types.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useCreateThing = () => {
  const queryClient = useQueryClient();
  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async (thing: Thing) => {
      return createThingAction(thing);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "things"] });
    },
  });
};
