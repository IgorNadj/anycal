"use server";

import type { CalendarEvent, User } from "../types.ts";
import { database } from "./db/database.ts";

export const getEventsAction = async (
  userUuid: User["uuid"],
): Promise<CalendarEvent[]> => {
  const calendarUuids = new Set(
    Array.from(database.data.calendars.values())
      .filter((c) => c.userUuid === userUuid)
      .map((c) => c.uuid),
  );
  const thingUuids = new Set(
    Array.from(database.data.things.values())
      .filter((t) => calendarUuids.has(t.calendarUuid))
      .map((t) => t.uuid),
  );
  return Array.from(database.data.events.values()).filter((e) =>
    thingUuids.has(e.thingUuid),
  );
};
