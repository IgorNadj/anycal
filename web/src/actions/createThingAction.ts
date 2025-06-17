"use server";

import { Thing } from "../types.ts";
import { createThing } from "../../../server/src/database.ts";

export const createThingAction = async (thing: Thing) => {
  createThing.run(thing.uuid, thing.name, thing.colour, thing.visible ? 1 : 0);
};
