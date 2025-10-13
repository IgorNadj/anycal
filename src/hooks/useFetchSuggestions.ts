import { useQuery } from "@tanstack/react-query";
import { fetchSuggestionsAction } from "../actions/fetchSuggestionsAction.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useFetchSuggestions = (input: string) => {
  const { userUuid } = useContext(AppContext);

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
