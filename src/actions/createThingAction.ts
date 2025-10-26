"use server";

import type { Thing } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { createThing } from "./db/mutations.ts";

export const createThingAction = async (thing: Thing) => {
  createThing(database, thing);
  return ok({});
};
