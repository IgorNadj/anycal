"use server";

import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const updateCalendarAction = async (calendar: Calendar) => {
  await database.update(({ calendars }) => {
    calendars.set(calendar.uuid, calendar);
  });
  return ok({});
};
