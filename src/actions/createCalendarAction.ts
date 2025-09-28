"use server";

import type { Calendar } from "../types.ts";
import { database } from "../database.ts";

export const createCalendarAction = async (calendar: Calendar) => {
  database
    .prepare(
      "INSERT INTO calendar (uuid, userUuid, name, colour, visible) VALUES (?, ?, ?, ?, ?)",
    )
    .run(
      calendar.uuid,
      calendar.userUuid,
      calendar.name,
      calendar.colour,
      calendar.visible ? 1 : 0,
    );
};
