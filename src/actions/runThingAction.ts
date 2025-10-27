"use server";

import { GoogleGenAI } from "@google/genai";
import { add, format, parseISO } from "date-fns";
import { debuglog } from "node:util";

import { v4 as uuidv4 } from "uuid";
import type {
  ThingRun_NormalEvent,
  ThingRun_Resp,
  ThingRun_SubjectToChangeEvent,
  ThingRun_UnknownDateEvent,
  ThingRun_VagueDateEvent,
} from "../types.ts";

type Resp_NormalEvent = Omit<ThingRun_NormalEvent, "uuid" | "date"> & {
  date: string; // ISO8601 RFC3339 format
};
type Resp_SubjectToChangeEvent = Omit<ThingRun_SubjectToChangeEvent, "uuid" | "date"> & {
  date: string; // ISO8601 RFC3339 format
};
type Resp_UnknownDateEvent = Omit<ThingRun_UnknownDateEvent, "uuid">;
type Resp_VagueDateEvent = Omit<ThingRun_VagueDateEvent, "uuid">;
type Resp = Omit<ThingRun_Resp, "events"> & {
  events: (
    | Resp_NormalEvent
    | Resp_SubjectToChangeEvent
    | Resp_UnknownDateEvent
    | Resp_VagueDateEvent
  )[];
};

const cache: Record<string, ThingRun_Resp> = {};

const log = debuglog("anycal");

export const runThingAction = async (input: string): Promise<ThingRun_Resp> => {
  log("RunThing for: ", input);

  const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  if (!input) throw new Error("Input is empty");

  if (cache[input]) {
    return cache[input];
  }

  const ai = new GoogleGenAI({ apiKey });

  const groundingTool = {
    googleSearch: {},
  };

  const config = {
    tools: [groundingTool],
    systemInstruction: `You are an API endpoint for a client interface which is used for making 
      new calendar events, sourced from the internet. A user will say a thing, and your job is 
      to find when that thing is, and return the date. 
      
      If the thing has multiple events, for example, every first sunday of the year, return each event.
      
      Don't return any events before ${format(add(new Date(), { days: 1 }), "yyyy-MM-dd")}. 
      
      For each event:
      - All event types have name.
      - All events have description, which describes the event itself.
      - If the description would not add anything, leave it blank as an empty string.
      - Important: description has no additional information about the date of the event. 
      - Different types of events:
        - If the date is known, and unlikely to change, return as a NormalEvent.
        - If the date is known, but likely to change, e.g. the finals should be on this date but
          the organisers will set the actual date closer to the finals, return as a SubjectToChangeEvent 
          with reason being why it is subject to change.
        - If the date is vague, e.g. a new product launch is expected to come in Fall this year,
          return as a VagueDateEvent, with reason being why it is vague.
        - If the date is completely unknown, return as an UnknownDateEvent, with reason being why it is 
          unknown
      
      Also summarise the input query into a short title (less than 5 words), returned as "summarisedTitle".
      
      The response structure should be:
      
      { 
        summarisedTitle: string,
        reasonForNoResults: string | null, 
        events: (NormalEvent | SubjectToChangeEvent | UnknownDateEvent | VagueDateEvent)[],
      }
      
      Type definitions:
      
      NormalEvent: {
        type: "NormalEvent",
        name: string,
        description: string,
        date: string, // ISO8601 RFC3339 format
      }
      
      SubjectToChangeEvent: {
        type: "SubjectToChangeEvent",
        name: string,
        description: string,
        date: string, // ISO8601 RFC3339 format
        reason: string, // reason for date likely to change
      }
      
      UnknownDateEvent: {
        type: "UnknownDateEvent",
        name: string,
        description: string,
        reason: string, // reason for no date being known
      }
      
      VagueDateEvent: {
        type: "VagueDateEvent",
        name: string,
        description: string,
        vagueDate: string, // human readable form
        reason: string, // reason for vague date
      }
      
      `,
  };

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

  const parsed = JSON.parse(strippedText) as Resp;

  log("LLM Response parsed: ", JSON.stringify(parsed));

  const hydratedEvents: ThingRun_Resp["events"] = parsed.events.map((rawEvent) => {
    if (rawEvent.type === "NormalEvent" || rawEvent.type === "SubjectToChangeEvent") {
      return {
        ...rawEvent,
        uuid: uuidv4(),
        date: parseISO(rawEvent.date),
      };
    } else {
      return {
        ...rawEvent,
        uuid: uuidv4(),
      };
    }
  });

  const hydratedResp: ThingRun_Resp = {
    ...parsed,
    events: hydratedEvents,
  };

  cache[input] = hydratedResp;

  return hydratedResp;
};
