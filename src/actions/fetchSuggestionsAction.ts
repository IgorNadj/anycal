"use server";

import type { Suggestion } from "../types.ts";
import { GoogleGenAI } from "@google/genai";
import { add, format, parseISO } from "date-fns";

const cache: Record<string, Suggestion[]> = {};

export const fetchSuggestionsAction = async (input: string): Promise<Suggestion[]> => {
  console.log("Fetching suggestions for: ", input);

  const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  if (!input) throw new Error("Input is empty");

  if (cache[input]) {
    return cache[input];
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `You are an API endpoint for a client interface which is used for making new calendar events, sourced from the internet. A user will say a thing, and your job is to find when that thing is, and return the date. If the thing is ambiguous, return multiple suggestions, each with a title and date. The date should be in ISO8601 RFC3339 format. Return only the json, nothing else. Don't return any events before ${format(add(new Date(), { days: 1 }), "yyyy-MM-dd")}. The response structure should be: "{ suggestions: [{ title: string, date: string }] }". If there are no suggestions, return an empty array.`,
    },
    contents: input,
  });

  if (!response.text) {
    throw new Error("LLM response empty");
  }

  console.log("LLM Response: ", response.text);

  const strippedText = response.text.replace("```json", "").replace("```", "");

  const parsed = JSON.parse(strippedText) as {
    suggestions: { title: string; date: string }[];
  };

  const hydrated = parsed.suggestions.map((suggestion) => ({
    title: suggestion.title,
    date: parseISO(suggestion.date),
  }));

  cache[input] = hydrated;

  return hydrated;
};
