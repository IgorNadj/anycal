"use server";

import { Thing } from "../types.ts";
import { deleteThing } from "../../../server/src/database.ts";

export const deleteThingAction = async (thing: Thing) => {
  deleteThing.run(thing.uuid);
};
