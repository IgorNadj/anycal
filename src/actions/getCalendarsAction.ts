"use server";

import type { Calendar, User } from "../types.ts";
import { database } from "../database.ts";
import { getCalendars } from "../sql/queries.ts";

export const getCalendarsAction = async (
  userUuid: User["uuid"],
): Promise<Calendar[]> => {
  return getCalendars(database, userUuid);
};
