"use server";

import type { UpdateCalendarEvent } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { updateEvent } from "./db/mutations.ts";

export const updateEventAction = async (event: UpdateCalendarEvent) => {
  updateEvent(database, {
    ...event,
    lastModified: new Date(), // do this on the server in case client time is wrong
    sequence: event.sequence + 1,
  });
  return ok({});
};
