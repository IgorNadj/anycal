"use server";

import { Thing } from "../types/types.ts";
import { updateThing as dbUpdateThing } from "../database/database.ts";

export const updateThing = async (thing: Thing) => {
  dbUpdateThing.run(thing.name, thing.colour, thing.visible ? 1 : 0, thing.uuid);
  // We might need to revalidate the cache or refetch data here
  // For now, we'll just perform the database operation.
}; 