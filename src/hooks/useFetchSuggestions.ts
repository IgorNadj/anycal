import { useQuery } from "@tanstack/react-query";
import { fetchSuggestionsAction } from "../actions/fetchSuggestionsAction.ts";

export const useFetchSuggestions = (input: string) => {
  return useQuery({
    queryKey: ["suggestions", input],
    queryFn: () => fetchSuggestionsAction(input),
    staleTime: 1000 * 60 * 5,
    enabled: !!input && input.length > 0,
  });
};
