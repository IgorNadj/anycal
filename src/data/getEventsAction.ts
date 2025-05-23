"use server";
import { getEvents as dbGetEvents } from "../database/database.ts";
import { Event } from "../types/types.ts"; // Import the Event type
import { parseISO } from "date-fns"; // For robust date parsing

// This type matches the structure of an event row from the 'event' table
type DbEvent = {
  uuid: string;
  name: string;
  date: string; // Date is stored as a string in the database
  thingUuid: string;
};

export const getEventsAction = async (): Promise<Event[]> => {
  const eventsFromDb = dbGetEvents.all() as DbEvent[];
  return eventsFromDb.map(event => ({
    ...event,
    date: parseISO(event.date), // Convert date string to Date object
  }));
};
