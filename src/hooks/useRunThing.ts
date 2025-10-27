import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { runThingAction } from "../actions/runThingAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import { NotLoggedInError } from "../utils/NotLoggedInError.ts";

export const useRunThing = (input: string) => {
  const { userUuid } = useContext(AuthContext);

  return useQuery({
    queryKey: [userUuid, "runThing", input],
    queryFn: () => {
      if (!userUuid) throw NotLoggedInError();
      return runThingAction(input);
    },
    enabled: !!userUuid && !!input && input.length > 3,
    initialData: {
      summarisedTitle: "",
      reasonForNoResults: null,
      events: [],
    },
  });
};
