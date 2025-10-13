import { useQuery } from "@tanstack/react-query";
import { getUserProfileAction } from "../actions/getUserProfileAction.ts";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useUserProfile = () => {
  const { userUuid } = useContext(AppContext);

  return useQuery({
    queryKey: [userUuid, "user_profile"],
    queryFn: async () => {
      if (!userUuid) throw NotLoggedInError();
      return getUserProfileAction(userUuid);
    },
    enabled: !!userUuid,
  });
};
