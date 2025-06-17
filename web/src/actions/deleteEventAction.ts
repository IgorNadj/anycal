"use server";

import { Event } from "../types.ts";
import { deleteEvent } from "../../../server/src/database.ts";

export const deleteEventAction = async (event: Event) => {
  deleteEvent.run(event.uuid);
};
