"use server";

import { database } from "../database.ts";
import type { CalendarEvent, User } from "../types.ts";
import { parseISO } from "date-fns";

type DbCalendarEvent = Omit<CalendarEvent, "date"> & {
  date: string;
};

export const getEventsAction = async (user: User): Promise<CalendarEvent[]> => {
  const eventsRaw = database
    .prepare(
      "SELECT * FROM calendar_event WHERE thingUuid IN (SELECT uuid FROM thing WHERE userUuid = ?)",
    )
    .all(user.uuid) as unknown as DbCalendarEvent[];
  return eventsRaw.map((eventRaw) => ({
    ...eventRaw,
    date: parseISO(eventRaw.date),
  }));
};
