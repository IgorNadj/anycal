import { useQuery } from "@tanstack/react-query";
import { Thing } from "../types/types.ts";
import { getThingsAction } from "./getThingsAction.ts";

// ProcessedThing is no longer strictly needed here as Thing is the target type
// but keeping it if it's used elsewhere, or can be removed if not.
export type ProcessedThing = Thing; // Or simply use Thing directly

// SerializedThingFromDb type is no longer needed here as action returns Thing[]

export const useThings = () => {
  return useQuery<Thing[], Error, Thing[], [string]>({
    queryKey: ["things"],
    queryFn: async () => {
      const things = await getThingsAction(); // Now returns Thing[] directly
      return things;
    },
    initialData: [],
  });
};
