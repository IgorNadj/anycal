"use server";

import { Thing } from "../types.ts";
import { database } from "../../../server/src/database.ts";

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
