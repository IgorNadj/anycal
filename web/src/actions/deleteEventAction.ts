"use server";

import { Event } from "../types.ts";
import { database } from "../../../server/src/database.ts";

export const deleteEventAction = async (event: Event) => {
  database.prepare("DELETE FROM event WHERE uuid = ?").run(event.uuid);
};
