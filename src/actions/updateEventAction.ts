"use server";

import type { Event } from "../types.ts";
import { formatRFC3339 } from "date-fns";
import { database } from "../database.ts";

export const updateEventAction = async (event: Event) => {
  database
    .prepare("UPDATE event SET name = ?, date = ? WHERE uuid = ?")
    .run(event.name, formatRFC3339(event.date), event.uuid);
};
