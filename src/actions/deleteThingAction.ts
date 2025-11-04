"use server";

import type { Thing } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const deleteThingAction = async (thing: Thing) => {
  database.update(({ things }) => {
    return Object.fromEntries(
      Object.entries(things).filter(([, t]) => t.uuid !== thing.uuid),
    );
  });
  return ok({});
};
