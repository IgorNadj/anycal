"use server";

import { database } from "../../../server/src/database.ts";
import { Thing } from "../types.ts";

export const updateThingAction = async (thing: Thing) => {
  database
    .prepare(
      "UPDATE thing SET name = ?, colour = ?, visible = ?  WHERE uuid = ?",
    )
    .run(thing.name, thing.colour, thing.visible ? 1 : 0, thing.uuid);
};
