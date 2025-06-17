import { useQuery } from "@tanstack/react-query";
import { getThingsAction } from "../actions/getThingsAction.ts";
import { User } from "../types.ts";

export const useThings = (user: User) => {
  return useQuery({
    queryKey: ["things"],
    queryFn: () => getThingsAction(user),
    initialData: [],
  });
};
