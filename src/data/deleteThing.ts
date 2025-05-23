"use server";

import { Thing } from "../types/types.ts";
import { deleteThing as dbDeleteThing } from "../database/database.ts";

export const deleteThing = async (thing: Thing) => {
  dbDeleteThing.run(thing.uuid);
  // We might need to revalidate the cache or refetch data here
  // For now, we'll just perform the database operation.
}; 