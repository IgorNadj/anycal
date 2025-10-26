"use server";

import { database } from "../database.ts";
import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { updateCalendar } from "./sql/mutations.ts";

export const updateCalendarAction = async (calendar: Calendar) => {
  updateCalendar(database, calendar);
  return ok({});
};
