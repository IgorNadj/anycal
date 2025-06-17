"use server";

import { createEvent } from "../../../server/src/database.ts";
import { Event } from "../types.ts";
import { formatRFC3339 } from "date-fns";

export const createEventAction = async (event: Event) => {
  createEvent.run(
    event.uuid,
    event.name,
    formatRFC3339(event.date),
    event.thingUuid,
  );
};
