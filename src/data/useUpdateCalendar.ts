import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { updateCalendarAction } from "../actions/updateCalendarAction.ts";

export const useUpdateCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (calendar: Calendar) => updateCalendarAction(calendar),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
  });
};
