"use server";

import type { Thing } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { updateThing } from "./db/mutations.ts";

export const updateThingAction = async (thing: Thing) => {
  updateThing(database, thing);
  return ok({});
};
