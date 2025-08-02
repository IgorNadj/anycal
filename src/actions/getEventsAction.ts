"use server";

import { database } from "../database.ts";
import type { Event, User } from "../types.ts";
import { parseISO } from "date-fns";

type DbEvent = Omit<Event, "date"> & {
  date: string;
};

export const getEventsAction = async (user: User): Promise<Event[]> => {
  const eventsRaw = database
    .prepare(
      "SELECT * FROM event WHERE thingUuid IN (SELECT uuid FROM thing WHERE userUuid = ?)",
    )
    .all(user.uuid) as unknown as DbEvent[];
  return eventsRaw.map((eventRaw) => ({
    ...eventRaw,
    date: parseISO(eventRaw.date),
  }));
};
