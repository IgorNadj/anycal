"use server";

import type { CalendarEvent } from "../types.ts";
import { database } from "./db/database.ts";
import { deleteEvent } from "./db/mutations.ts";

export const deleteEventAction = async (event: CalendarEvent) => {
  deleteEvent(database, event.uuid);
};
