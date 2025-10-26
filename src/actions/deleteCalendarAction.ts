"use server";

import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { deleteCalendar } from "./db/mutations.ts";

export const deleteCalendarAction = async (calendar: Calendar) => {
  deleteCalendar(database, calendar.uuid);
  return ok({});
};
