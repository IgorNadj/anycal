import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { generateThingNameAction } from "../actions/generateThingNameAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import type { Thing } from "../types.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useGenerateThingName = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async ({ thing, prompt }: { thing: Thing; prompt: string }) => {
      if (!userUuid) throw NotLoggedInError();
      return generateThingNameAction({ thingUuid: thing.uuid, prompt });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "things"] });
    },
  });
};
