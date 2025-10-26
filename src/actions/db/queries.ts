import { parseISO } from "date-fns";
import type { DatabaseSync } from "node:sqlite";
import type { Calendar, CalendarEvent, Thing, User, UserProfile } from "../../types.ts";

type DbCalendarEvent = Omit<CalendarEvent, "date" | "created" | "lastModified"> & {
  date: string;
  created: string;
  lastModified: string;
};

export function getUserProfile(db: DatabaseSync, uuid: string): UserProfile {
  return db
    .prepare("SELECT email FROM user WHERE uuid = ?")
    .get(uuid) as unknown as UserProfile;
}

export function getUserByEmail(db: DatabaseSync, email: string): User | undefined {
  return db
    .prepare("SELECT uuid, email, passwordHash, passwordSalt FROM user WHERE email = ?")
    .get(email) as User | undefined;
}

export function getUserByUuid(db: DatabaseSync, uuid: string): User | undefined {
  return db
    .prepare("SELECT uuid, email, passwordHash, passwordSalt FROM user WHERE uuid = ?")
    .get(uuid) as User | undefined;
}

export function getCalendars(db: DatabaseSync, userUuid: string): Calendar[] {
  return db
    .prepare("SELECT * FROM calendar WHERE userUuid = ?")
    .all(userUuid) as unknown as Calendar[];
}

export function getEvents(db: DatabaseSync, userUuid: string): CalendarEvent[] {
  const rows = db
    .prepare(
      "SELECT ce.* FROM calendar_event ce WHERE ce.thingUuid IN (SELECT t.uuid FROM thing t WHERE t.calendarUuid IN (SELECT c.uuid FROM calendar c WHERE c.userUuid = ?))",
    )
    .all(userUuid) as unknown as DbCalendarEvent[];
  return rows.map((e) => ({
    ...e,
    date: parseISO(e.date),
    created: parseISO(e.created),
    lastModified: parseISO(e.lastModified),
  }));
}

export function getCalendarByUuid(
  db: DatabaseSync,
  calendarUuid: string,
): Calendar | undefined {
  return db
    .prepare("SELECT * FROM calendar WHERE uuid = ?")
    .get(calendarUuid) as unknown as Calendar | undefined;
}

export function getEventsByCalendarUuid(
  db: DatabaseSync,
  calendarUuid: string,
): CalendarEvent[] {
  const rows = db
    .prepare(
      "SELECT ce.* FROM calendar_event ce WHERE ce.thingUuid IN (SELECT t.uuid FROM thing t WHERE t.calendarUuid = ?)",
    )
    .all(calendarUuid) as unknown as DbCalendarEvent[];
  return rows.map((e) => ({
    ...e,
    date: parseISO(e.date),
    created: parseISO(e.created),
    lastModified: parseISO(e.lastModified),
  }));
}

export type DbThing = Omit<Thing, "visible"> & { visible: number };

export function getThingsByUserUuid(db: DatabaseSync, userUuid: string): Thing[] {
  const rows = db
    .prepare(
      "SELECT * FROM thing WHERE calendarUuid IN (SELECT uuid FROM calendar WHERE userUuid = ?)",
    )
    .all(userUuid) as unknown as DbThing[];
  return rows.map((t) => ({ ...t, visible: t.visible === 1 }));
}

export function getThingByUuid(db: DatabaseSync, thingUuid: string): Thing | undefined {
  const row = db
    .prepare("SELECT * FROM thing WHERE uuid = ?")
    .get(thingUuid) as unknown as DbThing | undefined;
  return row ? { ...row, visible: row.visible === 1 } : undefined;
}
