import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CalendarEvent } from "../types.ts";
import { deleteEventAction } from "../actions/deleteEventAction.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AppContext);

  return useMutation({
    mutationFn: async (event: CalendarEvent) => {
      if (!userUuid) throw NotLoggedInError();
      return deleteEventAction(event);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "events"] });
    },
  });
};
