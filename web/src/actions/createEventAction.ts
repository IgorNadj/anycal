"use server";

import { Event } from "../types.ts";
import { formatRFC3339 } from "date-fns";
import { database } from "../../../server/src/database.ts";

export const createEventAction = async (event: Event) => {
  database
    .prepare(
      "INSERT INTO event (uuid, name, date, thingUuid) VALUES (?, ?, ?, ?)",
    )
    .run(event.uuid, event.name, formatRFC3339(event.date), event.thingUuid);
};
