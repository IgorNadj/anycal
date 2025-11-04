import { SuperJSONFileSyncPreset } from "lowdb/node";
import type { Calendar, CalendarEvent, Thing, User } from "../../types.ts";

const dbPath = process.env.DB_PATH || "/home/db/db.json";
console.log(`Using database at ${dbPath}`);

export type DbSchema = {
  users: Map<User["uuid"], User>;
  calendars: Map<Calendar["uuid"], Calendar>;
  things: Map<Thing["uuid"], Thing>;
  events: Map<CalendarEvent["uuid"], CalendarEvent>;
};

export const database = SuperJSONFileSyncPreset<DbSchema>(dbPath, {
  users: new Map<User["uuid"], User>(),
  calendars: new Map<Calendar["uuid"], Calendar>(),
  things: new Map<Thing["uuid"], Thing>(),
  events: new Map<CalendarEvent["uuid"], CalendarEvent>(),
});

