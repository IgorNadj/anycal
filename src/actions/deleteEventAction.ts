"use server";

import { database } from "../database.ts";
import type { CalendarEvent } from "../types.ts";
import { deleteEvent } from "./db/mutations.ts";

export const deleteEventAction = async (event: CalendarEvent) => {
  deleteEvent(database, event.uuid);
};
