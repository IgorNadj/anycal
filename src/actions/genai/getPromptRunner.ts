"use server";

import { GoogleGenAI } from "@google/genai";
import { debuglog } from "node:util";

export const getPromptRunner = <TResp>(debugName: string, systemInstruction: string) => {
  const log = debuglog("anycal:" + debugName);

  const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });

  const groundingTool = {
    googleSearch: {},
  };

  const config = {
    tools: [groundingTool],
    systemInstruction,
  };

  const cache: Record<string, any> = {};

  return {
    run: async (input: string): Promise<TResp> => {
      log(`runPrompt: `, input);

      if (!input) throw new Error("Input is empty");

      if (cache[input]) {
        log("runPrompt cache HIT");
        return cache[input];
      }
      log("runPrompt cache MISS");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config,
        contents: input,
      });

      if (!response.text) {
        throw new Error("LLM response empty");
      }

      log("LLM Response: ", JSON.stringify(response));
      log("LLM Response text: ", response.text);

      const strippedText = response.text.replace("```json", "").replace("```", "");

      const parsed = JSON.parse(strippedText) as TResp;

      log("LLM Response parsed: ", parsed);

      cache[input] = parsed;

      return parsed;
    },
  };
};
