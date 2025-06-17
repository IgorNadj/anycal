"use server";

import { database } from "../../../server/src/database.ts";
import { Thing, User } from "../types.ts";
import { DbThing } from "../../../server/src/types.ts";

export const getThingsAction = async (user: User): Promise<Thing[]> => {
  const thingsRaw = database
    .prepare("SELECT * FROM thing WHERE userUuid = ?")
    .all(user.uuid) as unknown as DbThing[];
  return thingsRaw.map((thing) => ({
    ...thing,
    visible: thing.visible === 1,
  }));
};
