import { useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { deleteCalendarAction } from "../actions/deleteCalendarAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useDeleteCalendar = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AppContext);

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
