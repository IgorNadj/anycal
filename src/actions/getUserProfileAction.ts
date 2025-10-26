"use server";

import { database } from "../database.ts";
import type { User, UserProfile } from "../types.ts";
import { getUserProfile } from "./db/queries.ts";

export const getUserProfileAction = async (
  userUuid: User["uuid"],
): Promise<UserProfile> => {
  return getUserProfile(database, userUuid);
};
