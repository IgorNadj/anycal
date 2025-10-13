"use server";

import type { CalendarEvent } from "../types.ts";
import { updateEvent } from "../sql/mutations.ts";
import { database } from "../database.ts";

export const updateEventAction = async (event: CalendarEvent) => {
  return updateEvent(database, event);
};
