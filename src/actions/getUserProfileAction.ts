"use server";

import type { User, UserProfile } from "../types.ts";
import { database } from "./db/database.ts";

export const getUserProfileAction = async (
  userUuid: User["uuid"],
): Promise<UserProfile> => {
  const user = database.data.users[userUuid];
  return { email: user.email };
};
