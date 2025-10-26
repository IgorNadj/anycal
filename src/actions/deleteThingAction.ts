"use server";

import { database } from "./db/database.ts";
import { deleteThing } from "./db/mutations.ts";

export const deleteThingAction = async (thingUuid: string) => {
  deleteThing(database, thingUuid);
};
