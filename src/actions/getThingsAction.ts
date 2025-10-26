"use server";

import type { Thing } from "../types.ts";
import { database } from "./db/database.ts";
import { getThingsByUserUuid } from "./db/queries.ts";

export const getThingsAction = async (userUuid: string): Promise<Thing[]> => {
  return getThingsByUserUuid(database, userUuid);
};
