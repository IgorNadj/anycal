"use server";

import { Thing } from "../types.ts";
import { database } from "../../../server/src/database.ts";

export const deleteThingAction = async (thing: Thing) => {
  database.prepare("DELETE FROM thing WHERE uuid = ?").run(thing.uuid);
};
