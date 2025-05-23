import { Suggestion } from "../types/types.ts";

type SerializedSuggestion = {
  title: string;
  date: string;
};

export const fetchSuggestions = async (
  input: string,
): Promise<Suggestion[]> => {
  if (!input || input.length < 3) return [];

  const response = await fetch(
    `http://localhost:3000/api/suggest?what=${encodeURIComponent(input)}`,
  );

  try {
    const asJson = await response.json();

    console.log("asJson", asJson);

    const suggestions = asJson?.suggestions;
    if (!suggestions || !Array.isArray(suggestions)) {
      console.error("Unexpected response:", asJson);
      return [];
    }

    return suggestions.map((s: SerializedSuggestion) => ({
      ...s,
      date: new Date(s.date),
    }));
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return [];
  }
};
