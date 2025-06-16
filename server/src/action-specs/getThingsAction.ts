"use server";

import { Thing } from "../../../web/src/types.ts";
import { ActionSpec } from "../action-utils/types.ts";
import { getThings } from "../database.js";
import { DbThing } from "../types.js";

export const getThingsAction: ActionSpec<void, Thing[]> = {
  url: "/api/things",
  method: "GET",
  handle: async (reqBody: void) => {
    const thingsRaw = getThings.all() as DbThing[];
    return thingsRaw.map((thing) => ({
      ...thing,
      visible: thing.visible === 1,
    }));
  },
};
