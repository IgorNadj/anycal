import { useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { updateCalendarAction } from "../actions/updateCalendarAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useUpdateCalendar = () => {
  const queryClient = useQueryClient();
  const { userUuid } = useContext(AppContext);

  return useValidatedMutation({
    validatedMutationFn: async (calendar: Calendar) => {
      if (!userUuid) throw NotLoggedInError();
      return updateCalendarAction(calendar);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "calendars"] });
    },
  });
};
