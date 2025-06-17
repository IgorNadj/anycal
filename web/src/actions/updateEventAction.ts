"use server";

import { database } from "../../../server/src/database.ts";
import { Event } from "../types.ts";
import { formatRFC3339 } from "date-fns";

export const updateEventAction = async (event: Event) => {
  database
    .prepare("UPDATE event SET name = ?, date = ? WHERE uuid = ?")
    .run(event.name, formatRFC3339(event.date), event.uuid);
};
