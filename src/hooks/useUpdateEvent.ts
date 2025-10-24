import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { updateEventAction } from "../actions/updateEventAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";
import type { UpdateCalendarEvent } from "../types.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async (event: UpdateCalendarEvent) => {
      if (!userUuid) throw NotLoggedInError();
      return updateEventAction(event);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "events"] });
    },
  });
};
