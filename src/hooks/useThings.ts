import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getThingsAction } from "../actions/getThingsAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";

export const useThings = () => {
  const { userUuid } = useContext(AuthContext);

  return useQuery({
    queryKey: [userUuid, "things"],
    queryFn: async () => {
      if (!userUuid) return [];
      return getThingsAction(userUuid);
    },
    initialData: [],
    enabled: !!userUuid,
  });
};
