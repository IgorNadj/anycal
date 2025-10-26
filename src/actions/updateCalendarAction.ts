"use server";

import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { updateCalendar } from "./db/mutations.ts";

export const updateCalendarAction = async (calendar: Calendar) => {
  updateCalendar(database, calendar);
  return ok({});
};
