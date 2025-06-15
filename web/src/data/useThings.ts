import { useQuery } from "@tanstack/react-query";
import { Thing } from "../types.ts";

export const useThings = () => {
  return useQuery<Thing[]>({
    queryKey: ["things"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/things");
      return await response.json();
    },
    initialData: [],
  });
};
