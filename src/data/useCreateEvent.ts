"use server";

import { Event } from "../types/types.ts";
import { createEvent as dbCreateEvent } from "../database/database.ts";

export const createEvent = async (event: Event) => {
  // Convert Date object to ISO string for database compatibility
  const eventForDb = {
    ...event,
    date: event.date.toISOString(),
  };
  dbCreateEvent.run(eventForDb.uuid, eventForDb.name, eventForDb.date, eventForDb.thingUuid);
  // We might need to revalidate the cache or refetch data here
  // depending on how you manage data fetching after this migration.
  // For now, we'll just perform the database operation.
};
