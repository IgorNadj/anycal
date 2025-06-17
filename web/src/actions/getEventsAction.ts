"use server";

import { getEvents } from "../../../server/src/database.ts";
import { Event } from "../types.ts";
import { DbEvent } from "../../../server/src/types.ts";
import { parseISO } from "date-fns";

export const getEventsAction = async (): Promise<Event[]> => {
  const eventsRaw = getEvents.all() as DbEvent[];
  return eventsRaw.map((eventRaw) => ({
    ...eventRaw,
    date: parseISO(eventRaw.date),
  }));
};
