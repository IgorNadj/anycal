import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { deleteEventAction } from "../actions/deleteEventAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import type { CalendarEvent } from "../types.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AuthContext);

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
