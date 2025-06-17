"use server";

import { database } from "../../../server/src/database.ts";
import { Event, User } from "../types.ts";
import { DbEvent } from "../../../server/src/types.ts";
import { parseISO } from "date-fns";

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
