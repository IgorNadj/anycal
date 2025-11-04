"use server";

import type { Calendar, User } from "../types.ts";
import { database } from "./db/database.ts";

export const getCalendarsAction = async (userUuid: User["uuid"]): Promise<Calendar[]> => {
  return Array.from(database.data.calendars.values()).filter(
    (c) => c.userUuid === userUuid,
  );
};
