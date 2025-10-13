import { useQueryClient } from "@tanstack/react-query";
import type { CalendarEvent } from "../types.ts";
import { createEventAction } from "../actions/createEventAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AppContext);

  return useValidatedMutation({
    validatedMutationFn: async (event: CalendarEvent) => {
      if (!userUuid) throw NotLoggedInError();
      return createEventAction(event);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
