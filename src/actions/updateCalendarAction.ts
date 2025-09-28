"use server";

import type { Calendar } from "../types.ts";
import { database } from "../database.ts";

export const updateCalendarAction = async (calendar: Calendar) => {
  database
    .prepare(
      "UPDATE calendar SET name = ?, colour = ?, visible = ?  WHERE uuid = ?",
    )
    .run(
      calendar.name,
      calendar.colour,
      calendar.visible ? 1 : 0,
      calendar.uuid,
    );
};
