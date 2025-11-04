"use server";

import type { Thing } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { generateThingName } from "./genai/generateThingName.ts";
import { getEvents } from "./genai/getEvents.ts";

export const updateThingAction = async (thing: Thing) => {
  // first persist to db
  await database.update(({ things }) => {
    things.set(thing.uuid, thing);
  });

  // 1. auto generate a name based on prompt
  // 2. get the events
  await Promise.all([runGenerateNiceName, runGetEvents]);

  return ok({});
};

const runGenerateNiceName = async (thing: Thing) => {
  if (thing.name) {
    return;
    // only auto-generate a name once
  }

  const resp = await generateThingName(thing);

  if (resp) {
    const { niceName, reasonForFailure } = resp;
    await database.update(({ things }) => {
      const updatedThing = database.data.things.get(thing.uuid); // re-get so it is fresh
      if (!updatedThing) return;

      if (niceName) updatedThing.name = niceName;

      // TODO: with versioning this will go in a different table thing_run or similar
      if (reasonForFailure)
        updatedThing.reasonForFailureToGenerateName = reasonForFailure;

      things.set(thing.uuid, updatedThing);
    });
  }
};

const runGetEvents = async (thing: Thing) => {
  const { newEvents, reasonForNoResults } = await getEvents(thing);

  if (reasonForNoResults) {
    // update thing result props (reason for no results)
    // TODO: with versioning this will go in a different table thing_run or similar
    const updatedThing = database.data.things.get(thing.uuid); // re-get so it is fresh
    if (!updatedThing) return;

    updatedThing.reasonForNoResults = reasonForNoResults;

    await database.update(({ things }) => {
      things.set(thing.uuid, updatedThing);
    });
  }

  // replace events
  await database.update(({ events }) => {
    for (const e of events.values()) {
      if (e.thingUuid === thing.uuid) {
        events.delete(e.uuid);
      }
    }
    for (const newEvent of newEvents) {
      events.set(newEvent.uuid, newEvent);
    }
  });
};
