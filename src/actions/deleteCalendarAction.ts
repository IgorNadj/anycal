"use server";

import type { Calendar } from "../types.ts";
import { database } from "../database.ts";
import { deleteCalendar } from "../sql/mutations.ts";

export const deleteCalendarAction = async (calendar: Calendar) => {
  deleteCalendar(database, calendar.uuid);
};
