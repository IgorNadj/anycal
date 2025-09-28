import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Calendar } from "../types.ts";
import { createCalendarAction } from "../actions/createCalendarAction.ts";

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (calendar: Calendar) => createCalendarAction(calendar),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
  });
};
