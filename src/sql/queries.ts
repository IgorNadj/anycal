import type { Calendar, CalendarEvent, User } from "../types.ts";
import { parseISO } from "date-fns";
import type { DatabaseSync } from "node:sqlite";

type DbCalendar = Omit<Calendar, "visible"> & { visible: number };
type DbCalendarEvent = Omit<CalendarEvent, "date"> & { date: string };

export function getUser(db: DatabaseSync, uuid: string): User {
  return db
    .prepare("SELECT uuid, email FROM user WHERE uuid = ?")
    .get(uuid) as unknown as User;
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
