"use server";

import type { User, UserProfile } from "../types.ts";
import { database } from "./db/database.ts";
import { getUserProfile } from "./db/queries.ts";

export const getUserProfileAction = async (
  userUuid: User["uuid"],
): Promise<UserProfile> => {
  return getUserProfile(database, userUuid);
};
