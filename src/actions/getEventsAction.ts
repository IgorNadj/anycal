"use server";

import { database } from "../database.ts";
import type { CalendarEvent, User } from "../types.ts";
import { getEvents } from "./db/queries.ts";

export const getEventsAction = async (
  userUuid: User["uuid"],
): Promise<CalendarEvent[]> => {
  return getEvents(database, userUuid);
};
