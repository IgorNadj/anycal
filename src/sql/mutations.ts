import { formatRFC3339 } from "date-fns";
import type { DatabaseSync } from "node:sqlite";
import type { Calendar, CalendarEvent, User } from "../types.ts";

export function createUser(db: DatabaseSync, user: User): void {
  db.prepare(
    "INSERT INTO user (uuid, email, passwordHash, passwordSalt) VALUES (?, ?, ?, ?)",
  ).run(user.uuid, user.email, user.passwordHash, user.passwordSalt);
}

export function createCalendar(db: DatabaseSync, calendar: Calendar): void {
  db.prepare(
    "INSERT INTO calendar (uuid, userUuid, name, colour, visible) VALUES (?, ?, ?, ?, ?)",
  ).run(
    calendar.uuid,
    calendar.userUuid,
    calendar.name,
    calendar.colour,
    calendar.visible ? 1 : 0,
  );
}

export function updateCalendar(db: DatabaseSync, calendar: Calendar): void {
  db.prepare("UPDATE calendar SET name = ?, colour = ?, visible = ?  WHERE uuid = ?").run(
    calendar.name,
    calendar.colour,
    calendar.visible ? 1 : 0,
    calendar.uuid,
  );
}

export function deleteCalendar(db: DatabaseSync, calendarUuid: string): void {
  db.prepare("DELETE FROM calendar WHERE uuid = ?").run(calendarUuid);
}

export function updateEvent(db: DatabaseSync, event: CalendarEvent): void {
  db.prepare(
    "UPDATE calendar_event SET name = ?, date = ?, calendarUuid = ?, created = ?, lastModified = ?, sequence = ? WHERE uuid = ?",
  ).run(
    event.name,
    formatRFC3339(event.date),
    event.calendarUuid,
    formatRFC3339(event.created),
    formatRFC3339(event.lastModified),
    event.sequence,
    event.uuid,
  );
}

export function createEvent(db: DatabaseSync, event: CalendarEvent): void {
  db.prepare(
    "INSERT INTO calendar_event (uuid, name, date, calendarUuid, created, lastModified, sequence) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(
    event.uuid,
    event.name,
    formatRFC3339(event.date),
    event.calendarUuid,
    formatRFC3339(event.created),
    formatRFC3339(event.lastModified),
    event.sequence,
  );
}

export function deleteEvent(db: DatabaseSync, eventUuid: string): void {
  db.prepare("DELETE FROM calendar_event WHERE uuid = ?").run(eventUuid);
}

export function updateUserProfile(db: DatabaseSync, uuid: string, email: string): void {
  db.prepare("UPDATE user SET email = ? WHERE uuid = ?").run(email, uuid);
}

export function updateUserPassword(
  db: DatabaseSync,
  uuid: string,
  passwordHash: string,
  passwordSalt: string,
): void {
  db.prepare("UPDATE user SET passwordHash = ?, passwordSalt = ? WHERE uuid = ?").run(
    passwordHash,
    passwordSalt,
    uuid,
  );
}
