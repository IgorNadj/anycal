"use server";

import { updateThing } from "../../../server/src/database.ts";
import { Thing } from "../types.ts";

export const updateThingAction = async (thing: Thing) => {
  updateThing.run(thing.name, thing.colour, thing.visible ? 1 : 0, thing.uuid);
};
