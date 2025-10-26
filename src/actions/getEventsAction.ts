"use server";

import type { CalendarEvent, User } from "../types.ts";
import { database } from "./db/database.ts";
import { getEvents } from "./db/queries.ts";

export const getEventsAction = async (
  userUuid: User["uuid"],
): Promise<CalendarEvent[]> => {
  return getEvents(database, userUuid);
};
