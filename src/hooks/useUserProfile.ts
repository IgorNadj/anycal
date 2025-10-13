import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getUserProfileAction } from "../actions/getUserProfileAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";

export const useUserProfile = () => {
  const { userUuid } = useContext(AuthContext);

  return useQuery({
    queryKey: [userUuid, "user_profile"],
    queryFn: async () => {
      if (!userUuid) throw NotLoggedInError();
      return getUserProfileAction(userUuid);
    },
    enabled: !!userUuid,
  });
};
