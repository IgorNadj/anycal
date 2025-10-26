"use server";

import { database } from "../database.ts";
import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { createCalendar } from "./db/mutations.ts";

export const createCalendarAction = async (calendar: Calendar) => {
  createCalendar(database, calendar);
  return ok({});
};
