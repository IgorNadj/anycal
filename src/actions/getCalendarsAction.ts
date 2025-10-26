"use server";

import { database } from "../database.ts";
import type { Calendar, User } from "../types.ts";
import { getCalendars } from "./sql/queries.ts";

export const getCalendarsAction = async (userUuid: User["uuid"]): Promise<Calendar[]> => {
  return getCalendars(database, userUuid);
};
