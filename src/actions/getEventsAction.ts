"use server";

import type { CalendarEvent, User } from "../types.ts";
import { database } from "./db/database.ts";

export const getEventsAction = async (
  userUuid: User["uuid"],
): Promise<CalendarEvent[]> => {
  const calendarUuids = new Set(
    Object.values(database.data.calendars)
      .filter((c) => c.userUuid === userUuid)
      .map((c) => c.uuid),
  );
  const thingUuids = new Set(
    Object.values(database.data.things)
      .filter((t) => calendarUuids.has(t.calendarUuid))
      .map((t) => t.uuid),
  );
  return Object.values(database.data.events).filter((e) => thingUuids.has(e.thingUuid));
};
