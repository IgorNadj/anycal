"use server";

import { Suggestion } from "../types/types.ts";
import { GoogleGenAI } from "@google/genai";
import { format, add, parseISO } from "date-fns";

export const fetchSuggestions = async (
  input: string,
): Promise<Suggestion[]> => {
  if (!input || input.length < 3) return [];

  const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;

  if (!apiKey) {
    console.error("API key is not configured");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: `You are an API endpoint for a client interface which is used for making new calendar events, sourced from the internet. A user will say a thing, and your job is to find when that thing is, and return the date. If the thing is ambiguous, return multiple suggestions, each with a title and date. The date should be in YYYY-MM-DD format. Return only the json, nothing else. Don't return any events before ${format(add(new Date(), { days: 1 }), "yyyy-MM-dd")}. The response structure should be: "{ suggestions: [{ title: string, date: string }] }". If there are no suggestions, return an empty array.`,
      },
      contents: input,
    });

    if (!response.text) {
      console.error("LLM response has empty text");
      return [];
    }

    console.log("LLM Response: ", response.text);

    const strippedText = response.text.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const suggestionsData = JSON.parse(strippedText);

    if (suggestionsData && suggestionsData.suggestions && Array.isArray(suggestionsData.suggestions)) {
      return suggestionsData.suggestions.map((suggestion: { title: string; date: string }) => ({
        ...suggestion,
        date: parseISO(suggestion.date),
      }));
    } else {
      console.error("LLM response does not match expected structure:", suggestionsData);
      return [];
    }
  } catch (error) {
    console.error("Error fetching or parsing suggestions:", error);
    return [];
  }
};
