"use server";

import type { CalendarEvent } from "../types.ts";
import { database } from "../database.ts";
import { createEvent } from "../sql/mutations.ts";
import { ok } from "../utils/validation.ts";

export const createEventAction = async (event: CalendarEvent) => {
  createEvent(database, event);
  return ok({});
};
