"use server";

import type { CalendarEvent } from "../types.ts";
import { database } from "../database.ts";

export const deleteEventAction = async (event: CalendarEvent) => {
  database.prepare("DELETE FROM calendar_event WHERE uuid = ?").run(event.uuid);
};
