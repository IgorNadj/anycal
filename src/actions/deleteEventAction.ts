"use server";

import type { CalendarEvent } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export const deleteEventAction = async (event: CalendarEvent) => {
  database.update(({ events }) => {
    return Object.fromEntries(
      Object.entries(events).filter(([, e]) => e.uuid !== event.uuid),
    );
  });
  return ok({});
};
