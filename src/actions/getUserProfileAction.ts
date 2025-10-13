"use server";

import type { User, UserProfile } from "../types.ts";
import { database } from "../database.ts";
import { getUserProfile } from "../sql/queries.ts";

export const getUserProfileAction = async (
  userUuid: User["uuid"],
): Promise<UserProfile> => {
  return getUserProfile(database, userUuid);
};
