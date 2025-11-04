"use server";

import type { Calendar } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const deleteCalendarAction = async (calendar: Calendar) => {
  await database.update(({ calendars }) => {
    return Object.fromEntries(
      Object.entries(calendars).filter(([, c]) => c.uuid !== calendar.uuid),
    );
  });
  return ok({});
};
