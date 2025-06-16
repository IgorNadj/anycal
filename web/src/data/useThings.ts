import { useQuery } from "@tanstack/react-query";
import { Thing } from "../types.ts";
import { getThingsAction } from "../actions/getThingsAction.ts";

export const useThings = () => {
  return useQuery<Thing[]>({
    queryKey: ["things"],
    queryFn: () => getThingsAction(),
    initialData: [],
  });
};
