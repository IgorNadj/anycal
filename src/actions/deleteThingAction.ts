"use server";

import type { Thing } from "../types.ts";
import { database } from "../database.ts";

export const deleteThingAction = async (thing: Thing) => {
  database.prepare("DELETE FROM thing WHERE uuid = ?").run(thing.uuid);
};
