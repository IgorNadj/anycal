"use server";

import type { NewCalendarEvent } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const createEventAction = async (event: NewCalendarEvent) => {
  const now = new Date(); // do this on the server in case client time is wrong
  await database.update(({ events }) => {
    events[event.uuid] = {
      ...event,
      created: now,
      lastModified: now,
      sequence: 0,
    };
  });
  return ok({});
};
