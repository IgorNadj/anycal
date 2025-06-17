import { useQuery } from "@tanstack/react-query";
import { getThingsAction } from "../actions/getThingsAction.ts";

export const useThings = () => {
  return useQuery({
    queryKey: ["things"],
    queryFn: () => getThingsAction(),
    initialData: [],
  });
};
