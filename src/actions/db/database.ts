import { JSONFilePreset } from "lowdb/node";
import type { Calendar, CalendarEvent, Thing, User } from "../../types.ts";

const dbPath = process.env.DB_PATH || "/home/db/db.json";
console.log(`Using database at ${dbPath}`);

export type DbSchema = {
  users: Record<User["uuid"], User>;
  calendars: Record<Calendar["uuid"], Calendar>;
  things: Record<Thing["uuid"], Thing>;
  events: Record<CalendarEvent["uuid"], CalendarEvent>;
};

export const database = await JSONFilePreset<DbSchema>(dbPath, {
  users: {},
  calendars: {},
  things: {},
  events: {},
});
