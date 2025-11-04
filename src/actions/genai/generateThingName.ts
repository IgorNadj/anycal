"use server";

import type { Thing } from "../../types.ts";
import { getPromptRunner } from "./getPromptRunner.ts";

const SYSTEM_INSTRUCTION = `You are part of an API making new calendar events, sourced from 
the internet. A user says a thing, and they want to know the date of that thing.

This API endpoint is to create a nice name for this thing based on the input.

E.g. "severance s3" should give "Severance Season 3 release date".  

Don't worry about the actual date of the thing, we just want a nice name.

The response structure must be:
{ 
  niceName: string | null,
  reasonForFailure: string | null,
}

Keep niceName short, under 5 words,

If you are unable to generate a nice name, return niceName as null and say the reason in reasonForFailure.
`;

type Resp = {
  niceName: string | null;
  reasonForFailure: string | null;
};

const promptRunner = getPromptRunner<Resp>("generateThingName", SYSTEM_INSTRUCTION);

export const generateThingName = async (thing: Thing): Promise<null | Resp> => {
  const { prompt } = thing;

  if (!prompt || prompt.length < 3) {
    return null;
  }

  return promptRunner.run(prompt);
};
