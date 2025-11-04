"use server";

import type { Calendar, User } from "../types.ts";
import { database } from "./db/database.ts";

export const getCalendarsAction = async (userUuid: User["uuid"]): Promise<Calendar[]> => {
  return Object.values(database.data.calendars).filter((c) => c.userUuid === userUuid);
};
