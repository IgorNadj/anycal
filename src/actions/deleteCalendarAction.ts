"use server";

import type { Calendar } from "../types.ts";
import { database } from "../database.ts";

export const deleteCalendarAction = async (calendar: Calendar) => {
  database.prepare("DELETE FROM calendar WHERE uuid = ?").run(calendar.uuid);
};
