import { useQuery } from "@tanstack/react-query";
import { Thing } from "../types/types.ts";
import { getThingsAction, SerializedThingFromDb } from "./getThingsAction.ts";

// This type represents the thing structure after client-side processing (visible number to boolean)
export type ProcessedThing = Omit<Thing, "visible"> & {
  visible: boolean;
};

export const useThings = () => {
  return useQuery<ProcessedThing[], Error, ProcessedThing[], [string]>({
    queryKey: ["things"],
    queryFn: async () => {
      const serializedThings = await getThingsAction();
      return serializedThings.map((thing: SerializedThingFromDb) => ({
        ...thing,
        visible: thing.visible === 1,
      }));
    },
    initialData: [],
  });
};
