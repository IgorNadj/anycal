"use server";

import type { Thing } from "../types.ts";
import { database } from "./db/database.ts";

export const getThingsAction = async (userUuid: string): Promise<Thing[]> => {
  const calendarUuids = new Set(
    Array.from(database.data.calendars.values())
      .filter((c) => c.userUuid === userUuid)
      .map((c) => c.uuid),
  );
  return Array.from(database.data.things.values()).filter((t) =>
    calendarUuids.has(t.calendarUuid),
  );
};
