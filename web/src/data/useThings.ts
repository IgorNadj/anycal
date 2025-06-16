import { useQuery } from "@tanstack/react-query";
import { Thing } from "../types.ts";
import { createActionCaller } from "../../../server/src/action-utils/createActionCaller.ts";
import { getThingsAction } from "../../../server/src/action-specs/getThingsAction.ts";

export const useThings = () => {
  const queryFn = createActionCaller(getThingsAction);

  return useQuery<Thing[]>({
    queryKey: ["things"],
    // queryFn: async () => {
    //   const response = await fetch("http://localhost:3000/api/things");
    //   return await response.json();
    // },
    queryFn: () => queryFn(),
    initialData: [],
  });
};
