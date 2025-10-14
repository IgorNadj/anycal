import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { createEventAction } from "../actions/createEventAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";
import type { NewCalendarEvent } from "../types.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async (event: NewCalendarEvent) => {
      if (!userUuid) throw NotLoggedInError();
      return createEventAction(event);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "events"] });
    },
  });
};
