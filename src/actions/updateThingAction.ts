"use server";

import { debuglog } from "node:util";
import type { Thing } from "../types.ts";
import { ok } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { generateThingName } from "./genai/generateThingName.ts";
import { getEvents } from "./genai/getEvents.ts";

const log = debuglog("anycal:updateThingAction");

export const updateThingAction = async (thing: Thing) => {
  // first persist to db
  database.update(({ things }) => {
    things.set(thing.uuid, thing);
  });

  // 1. auto generate a name based on prompt
  const run1 = runGenerateNiceName(thing);
  // 2. get the events
  const run2 = runGetEvents(thing);
  await Promise.all([run1, run2]);

  return ok({});
};

const runGenerateNiceName = async (thing: Thing) => {
  log("Running generate nice name");

  if (thing.niceName) {
    log("thing already has a niceName");
    return;
    // only auto-generate a niceName once
  }

  const resp = await generateThingName(thing);

  const { niceName, reasonForFailure } = resp;
  database.update(({ things }) => {
    const updatedThing = database.data.things.get(thing.uuid); // re-get so it is fresh
    if (!updatedThing) {
      throw new Error("Failed to refresh thing");
    }

    if (niceName) updatedThing.niceName = niceName;

    // TODO: with versioning this will go in a different table thing_run or similar
    if (reasonForFailure) updatedThing.reasonForFailureToGenerateName = reasonForFailure;

    things.set(thing.uuid, updatedThing);
  });
};

const runGetEvents = async (thing: Thing) => {
  log("Running get events");
  const { newEvents, reasonForNoResults } = await getEvents(thing);

  if (reasonForNoResults) {
    // update thing result props (reason for no results)
    // TODO: with versioning this will go in a different table thing_run or similar
    const updatedThing = database.data.things.get(thing.uuid); // re-get so it is fresh
    if (!updatedThing) return;

    updatedThing.reasonForNoResults = reasonForNoResults;

    database.update(({ things }) => {
      things.set(thing.uuid, updatedThing);
    });
  }

  // replace events
  database.update(({ events }) => {
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
