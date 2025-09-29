import { useQuery } from "@tanstack/react-query";
import { getAuth } from "../getAuth.ts";
import { getUserAction } from "../actions/getUserAction.ts";

export const useUser = () => {
  const auth = getAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (auth.isLoggedIn) {
        return getUserAction(auth.userUuid);
      } else {
        return {
          uuid: auth.guestUuid,
          email: "",
        };
      }
    },
    initialData: null,
  });
};
