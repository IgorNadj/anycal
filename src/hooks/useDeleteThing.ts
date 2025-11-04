import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { deleteThingAction } from "../actions/deleteThingAction.ts";
import { StateContext } from "../providers/StateContext.tsx";
import type { Thing } from "../types.ts";

export const useDeleteThing = () => {
  const queryClient = useQueryClient();
  const { currentlyEditingCalendar } = useContext(StateContext);

  const calendarUuid = currentlyEditingCalendar?.uuid;

  return useMutation({
    mutationFn: async (thing: Thing) => {
      return deleteThingAction(thing);
    },
    onSuccess: async () => {
      if (calendarUuid) {
        await queryClient.invalidateQueries({ queryKey: [calendarUuid, "things"] });
      }
    },
  });
};
