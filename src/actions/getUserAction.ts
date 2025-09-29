"use server";

import type { User } from "../types.ts";
import { database } from "../database.ts";
import { getUser } from "../sql/queries.ts";

export const getUserAction = async (userUuid: User["uuid"]): Promise<User> => {
  return getUser(database, userUuid);
};
