"use server";

import { Event } from "../types/types.ts";
import { updateEvent as dbUpdateEvent } from "../database/database.ts";

export const updateEvent = async (event: Event) => {
  // Convert Date object to ISO string for database compatibility
  const eventForDb = {
    ...event,
    date: event.date.toISOString(),
  };
  dbUpdateEvent.run(eventForDb.name, eventForDb.date, eventForDb.thingUuid, eventForDb.uuid);
  // We might need to revalidate the cache or refetch data here
  // For now, we'll just perform the database operation.
};
