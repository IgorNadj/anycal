import type { Calendar, CalendarEvent, User, UserProfile } from "../types.ts";
import { parseISO } from "date-fns";
import type { DatabaseSync } from "node:sqlite";

type DbCalendar = Omit<Calendar, "visible"> & { visible: number };
type DbCalendarEvent = Omit<CalendarEvent, "date" | "created" | "lastModified"> & { date: string; created: string; lastModified: string };

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
  const rows = db
    .prepare("SELECT * FROM calendar WHERE userUuid = ?")
    .all(userUuid) as unknown as DbCalendar[];
  return rows.map((c) => ({ ...c, visible: c.visible === 1 }));
}

export function getEvents(db: DatabaseSync, userUuid: string): CalendarEvent[] {
  const rows = db
    .prepare(
      "SELECT * FROM calendar_event WHERE calendarUuid IN (SELECT uuid FROM calendar WHERE userUuid = ?)",
    )
    .all(userUuid) as unknown as DbCalendarEvent[];
  return rows.map((e) => ({ ...e, date: parseISO(e.date), created: parseISO(e.created), lastModified: parseISO(e.lastModified) }));
}

export function getCalendarByUuid(db: DatabaseSync, calendarUuid: string): Calendar | undefined {
  const row = db
    .prepare("SELECT * FROM calendar WHERE uuid = ?")
    .get(calendarUuid) as unknown as DbCalendar | undefined;
  return row ? { ...row, visible: row.visible === 1 } : undefined;
}

export function getEventsByCalendarUuid(db: DatabaseSync, calendarUuid: string): CalendarEvent[] {
  const rows = db
    .prepare("SELECT * FROM calendar_event WHERE calendarUuid = ?")
    .all(calendarUuid) as unknown as DbCalendarEvent[];
  return rows.map((e) => ({ ...e, date: parseISO(e.date), created: parseISO(e.created), lastModified: parseISO(e.lastModified) }));
}
