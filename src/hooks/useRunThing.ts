import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { runThingAction } from "../actions/runThingAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";

const emptyData = {
  summarisedTitle: "",
  reasonForNoResults: null,
  events: [],
};

export const useRunThing = (input: string) => {
  const { userUuid } = useContext(AuthContext);

  return useQuery({
    queryKey: [userUuid, "runThing", input],
    queryFn: () => {
      if (!userUuid) return emptyData;
      return runThingAction(input);
    },
    enabled: !!userUuid && !!input && input.length > 0,
    initialData: emptyData,
  });
};
