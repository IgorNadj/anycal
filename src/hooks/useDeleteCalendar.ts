import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { deleteCalendarAction } from "../actions/deleteCalendarAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import type { Calendar } from "../types.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useDeleteCalendar = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async (calendar: Calendar) => {
      if (!userUuid) throw NotLoggedInError();
      return deleteCalendarAction(calendar);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "calendars"] });
      await queryClient.invalidateQueries({ queryKey: [userUuid, "events"] });
    },
  });
};
