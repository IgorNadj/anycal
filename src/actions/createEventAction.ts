"use server";

import { database } from "../database.ts";
import type { NewCalendarEvent } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { createEvent } from "./sql/mutations.ts";

export const createEventAction = async (event: NewCalendarEvent) => {
  const now = new Date(); // do this on the server in case client time is wrong
  createEvent(database, {
    ...event,
    created: now,
    lastModified: now,
    sequence: 0,
  });
  return ok({});
};
