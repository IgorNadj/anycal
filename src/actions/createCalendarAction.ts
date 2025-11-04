"use server";

import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const createCalendarAction = async (calendar: Calendar) => {
  database.update(({ calendars }) => {
    calendars.set(calendar.uuid, calendar);
  });
  return ok({});
};
