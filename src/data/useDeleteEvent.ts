"use server";

import { Event } from "../types/types.ts";
import { deleteEvent as dbDeleteEvent } from "../database/database.ts";

export const deleteEvent = async (event: Event) => {
  dbDeleteEvent.run(event.uuid);
  // We might need to revalidate the cache or refetch data here
  // For now, we'll just perform the database operation.
};
