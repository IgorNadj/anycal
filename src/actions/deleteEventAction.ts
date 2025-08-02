"use server";

import type { Event } from "../types.ts";
import { database } from "../database.ts";

export const deleteEventAction = async (event: Event) => {
  database.prepare("DELETE FROM event WHERE uuid = ?").run(event.uuid);
};
