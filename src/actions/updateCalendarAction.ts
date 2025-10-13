"use server";

import type { Calendar } from "../types.ts";
import { database } from "../database.ts";
import { updateCalendar } from "../sql/mutations.ts";
import { ok } from "../utils/validation.ts";

export const updateCalendarAction = async (calendar: Calendar) => {
  updateCalendar(database, calendar);
  return ok({});
};
