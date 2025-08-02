"use server";

import type { Thing } from "../types.ts";
import { database } from "../database.ts";

export const createThingAction = async (thing: Thing) => {
  database
    .prepare(
      "INSERT INTO thing (uuid, userUuid, name, colour, visible) VALUES (?, ?, ?, ?, ?)",
    )
    .run(
      thing.uuid,
      thing.userUuid,
      thing.name,
      thing.colour,
      thing.visible ? 1 : 0,
    );
};
