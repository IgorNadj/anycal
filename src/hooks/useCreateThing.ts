import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { createThingAction } from "../actions/createThingAction.ts";
import { StateContext } from "../providers/StateContext.tsx";
import type { Thing } from "../types.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useCreateThing = () => {
  const queryClient = useQueryClient();
  const { currentlyEditingCalendar } = useContext(StateContext);

  const calendarUuid = currentlyEditingCalendar?.uuid;

  return useValidatedMutation({
    validatedMutationFn: async (thing: Thing) => {
      return createThingAction(thing);
    },
    onSuccess: async () => {
      if (calendarUuid) {
        await queryClient.invalidateQueries({ queryKey: [calendarUuid, "things"] });
      }
    },
  });
};
