"use server";
import { getEvents as dbGetEvents } from "../database/database.ts";

// This type matches the structure of an event row from the 'event' table
type SerializedEventFromDb = {
  uuid: string;
  name: string;
  date: string; // Date is stored as a string in the database
  thingUuid: string;
};

export const getEventsAction = async (): Promise<SerializedEventFromDb[]> => {
  // Explicitly type the result of dbGetEvents.all()
  const eventsFromDb = dbGetEvents.all() as SerializedEventFromDb[];
  const fixedUpObjects = eventsFromDb.map((event: SerializedEventFromDb) => ({
    ...event,
  }));
  return fixedUpObjects;
};
