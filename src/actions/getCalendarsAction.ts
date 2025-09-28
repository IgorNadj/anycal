"use server";

import type { Calendar, User } from "../types.ts";
import { database } from "../database.ts";

type DbCalendar = Omit<Calendar, "visible"> & {
  visible: number;
};

export const getCalendarsAction = async (user: User): Promise<Calendar[]> => {
  const calendarsRaw = database
    .prepare("SELECT * FROM calendar WHERE userUuid = ?")
    .all(user.uuid) as unknown as DbCalendar[];
  return calendarsRaw.map((calendar) => ({
    ...calendar,
    visible: calendar.visible === 1,
  }));
};
