"use server";

import { Thing } from "../types/types.ts";
import { createThing as dbCreateThing } from "../database/database.ts";

export const createThing = async (thing: Thing) => {
  dbCreateThing.run(thing.uuid, thing.name, thing.colour, thing.visible ? 1 : 0);
  // We might need to revalidate the cache or refetch data here
  // For now, we'll just perform the database operation.
}; 