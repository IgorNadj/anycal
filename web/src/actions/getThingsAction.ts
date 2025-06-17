"use server";

import { getThings } from "../../../server/src/database.ts";
import { Thing } from "../types.ts";
import { DbThing } from "../../../server/src/types.ts";

export const getThingsAction = async (): Promise<Thing[]> => {
  const thingsRaw = getThings.all() as DbThing[];
  return thingsRaw.map((thing) => ({
    ...thing,
    visible: thing.visible === 1,
  }));
};
