"use server";

import { database } from "../database.ts";
import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { deleteCalendar } from "./sql/mutations.ts";

export const deleteCalendarAction = async (calendar: Calendar) => {
  deleteCalendar(database, calendar.uuid);
  return ok({});
};
