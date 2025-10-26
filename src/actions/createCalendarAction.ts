"use server";

import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { createCalendar } from "./db/mutations.ts";

export const createCalendarAction = async (calendar: Calendar) => {
  createCalendar(database, calendar);
  return ok({});
};
