"use server";

import type { Calendar } from "../types.ts";
import { database } from "../database.ts";
import { createCalendar } from "../sql/mutations.ts";

export const createCalendarAction = async (calendar: Calendar) => {
  createCalendar(database, calendar);
};
