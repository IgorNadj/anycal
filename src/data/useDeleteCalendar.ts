import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { deleteCalendarAction } from "../actions/deleteCalendarAction.ts";

export const useDeleteCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (calendar: Calendar) => deleteCalendarAction(calendar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
  });
};
