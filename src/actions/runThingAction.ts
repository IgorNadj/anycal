"use server";

import { add, format, parseISO } from "date-fns";

import { v4 as uuidv4 } from "uuid";
import type {
  ThingRun_NormalEvent,
  ThingRun_Resp,
  ThingRun_SubjectToChangeEvent,
  ThingRun_UnknownDateEvent,
  ThingRun_VagueDateEvent,
} from "../types.ts";
import { getPromptRunner } from "./genai/getPromptRunner.ts";

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

const SYSTEM_INSTRUCTION = `
You are an API endpoint for a client interface which is used for making 
new calendar events, sourced from the internet. A user will say a thing, and your job is 
to find when that thing is, and return the date. 

If the thing has multiple events, for example, every first sunday of the year, return each event.

Don't return any events before ${format(add(new Date(), { days: 1 }), "yyyy-MM-dd")}. 

The response structure must be:

{ 
  events: (NormalEvent | SubjectToChangeEvent | UnknownDateEvent | VagueDateEvent)[],
  reasonForNoResults: string | null, 
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

If no results are found, return an empty array, and set the reasonForNoResults field.
`;

const promptRunner = getPromptRunner<Resp>("runThing", SYSTEM_INSTRUCTION);

export const runThingAction = async (input: string) => {
  const response = await promptRunner.run(input);

  const hydratedEvents: ThingRun_Resp["events"] = response.events.map((rawEvent) => {
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
    ...response,
    events: hydratedEvents,
  };

  return hydratedResp;
};
