"use server";

import { ok, validationError } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { updateThing } from "./db/mutations.ts";
import { getThingByUuid } from "./db/queries.ts";
import { getPromptRunner } from "./genai/getPromptRunner.ts";

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

type Props = {
  thingUuid: string;
  prompt: string;
};

type Resp = {
  niceName: string | null;
  reasonForFailure: string | null;
};

const promptRunner = getPromptRunner<Resp>("generateThingName", SYSTEM_INSTRUCTION);

export const generateThingNameAction = async ({ thingUuid, prompt }: Props) => {
  const thing = getThingByUuid(database, thingUuid);
  if (!thing) throw new Error("Thing not found");

  if (thing.name) {
    return validationError({
      code: "NAME_ALREADY_SET",
      message: "Name is already set",
      field: "name",
    });
  }

  if (prompt.length < 3) {
    return validationError({
      code: "INPUT_TOO_SHORT",
      message: "Input must be at least 3 characters",
      field: "name",
    });
  }

  const response = await promptRunner.run(prompt);

  const { niceName } = response;
  if (!niceName) {
    return validationError({
      code: "UNABLE_TO_GENERATE_NAME",
      message: "Unable to generate name: " + response.reasonForFailure,
      field: "name",
    });
  }

  updateThing(database, {
    ...thing,
    name: niceName,
  });

  return ok({});
};
