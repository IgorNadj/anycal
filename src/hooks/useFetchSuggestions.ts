import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { fetchSuggestionsAction } from "../actions/fetchSuggestionsAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";

export const useFetchSuggestions = (input: string) => {
  const { userUuid } = useContext(AuthContext);

  return useQuery({
    queryKey: [userUuid, "suggestions", input],
    queryFn: () => {
      if (!userUuid) return [];
      return fetchSuggestionsAction(input);
    },
    enabled: !!userUuid && !!input && input.length > 0,
    initialData: [],
  });
};
