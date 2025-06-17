"use server";

import { updateEvent } from "../../../server/src/database.ts";
import { Event } from "../types.ts";
import { formatRFC3339 } from "date-fns";

export const updateEventAction = async (event: Event) => {
  updateEvent.run(
    event.name,
    formatRFC3339(event.date),
    event.thingUuid,
    event.uuid,
  );
};
