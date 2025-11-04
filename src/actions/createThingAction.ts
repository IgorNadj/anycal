"use server";

import type { Thing } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const createThingAction = async (thing: Thing) => {
  database.update(({ things }) => {
    things.set(thing.uuid, thing);
  });
  return ok({});
};
