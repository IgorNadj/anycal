"use server";

import type { Calendar, User } from "../types.ts";
import { database } from "./db/database.ts";
import { getCalendars } from "./db/queries.ts";

export const getCalendarsAction = async (userUuid: User["uuid"]): Promise<Calendar[]> => {
  return getCalendars(database, userUuid);
};
