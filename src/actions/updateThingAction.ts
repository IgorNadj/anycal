"use server";

import type { Thing } from "../types.ts";
import { database } from "../database.ts";

export const updateThingAction = async (thing: Thing) => {
  database
    .prepare(
      "UPDATE thing SET name = ?, colour = ?, visible = ?  WHERE uuid = ?",
    )
    .run(thing.name, thing.colour, thing.visible ? 1 : 0, thing.uuid);
};
