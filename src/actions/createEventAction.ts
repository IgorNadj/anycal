"use server";

import type { CalendarEvent } from "../types.ts";
import { formatRFC3339 } from "date-fns";
import { database } from "../database.ts";

export const createEventAction = async (event: CalendarEvent) => {
  database
    .prepare(
      "INSERT INTO calendar_event (uuid, name, date, thingUuid) VALUES (?, ?, ?, ?)",
    )
    .run(event.uuid, event.name, formatRFC3339(event.date), event.thingUuid);
};
