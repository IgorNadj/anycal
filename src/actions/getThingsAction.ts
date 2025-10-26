"use server";

import type { Thing } from "../types.ts";
import { database } from "./db/database.ts";
import { getThingsByCalendarUuid } from "./db/queries.ts";

export const getThingsAction = async (calendarUuid: string): Promise<Thing[]> => {
  return getThingsByCalendarUuid(database, calendarUuid);
};
