"use server";

import type { Thing, User } from "../types.ts";
import { database } from "../database.ts";

type DbThing = Omit<Thing, "visible"> & {
  visible: number;
};

export const getThingsAction = async (user: User): Promise<Thing[]> => {
  const thingsRaw = database
    .prepare("SELECT * FROM thing WHERE userUuid = ?")
    .all(user.uuid) as unknown as DbThing[];
  return thingsRaw.map((thing) => ({
    ...thing,
    visible: thing.visible === 1,
  }));
};
