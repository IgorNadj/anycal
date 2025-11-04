"use server";

import type { Thing } from "../types.ts";
import { database } from "./db/database.ts";

export const getThingsAction = async (userUuid: string): Promise<Thing[]> => {
  const calendarUuids = new Set(
    Object.values(database.data.calendars)
      .filter((c) => c.userUuid === userUuid)
      .map((c) => c.uuid),
  );
  return Object.values(database.data.things).filter((t) =>
    calendarUuids.has(t.calendarUuid)
  );
};
