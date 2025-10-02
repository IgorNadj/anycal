import type { Calendar, CalendarEvent, User, UserWithAuth } from "../types.ts";
import { parseISO } from "date-fns";
import type { DatabaseSync } from "node:sqlite";

type DbCalendar = Omit<Calendar, "visible"> & { visible: number };
type DbCalendarEvent = Omit<CalendarEvent, "date"> & { date: string };

export function getUser(db: DatabaseSync, uuid: string): User {
  return db
    .prepare("SELECT uuid, email FROM user WHERE uuid = ?")
    .get(uuid) as unknown as User;
}

export function getUserUuidByEmail(
  db: DatabaseSync,
  email: string,
): { uuid?: string } | undefined {
  return db.prepare("SELECT uuid FROM user WHERE email = ?").get(email) as
    | { uuid?: string }
    | undefined;
}

export function getUserWithAuthByEmail(
  db: DatabaseSync,
  email: string,
): UserWithAuth | undefined {
  return db
    .prepare(
      "SELECT uuid, email, passwordHash, passwordSalt FROM user WHERE email = ?",
    )
    .get(email) as UserWithAuth | undefined;
}

export function getUserWithAuthByUuid(
  db: DatabaseSync,
  uuid: string,
): UserWithAuth | undefined {
  return db
    .prepare(
      "SELECT uuid, email, passwordHash, passwordSalt FROM user WHERE uuid = ?",
    )
    .get(uuid) as UserWithAuth | undefined;
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
  return rows.map((e) => ({ ...e, date: parseISO(e.date) }));
}
