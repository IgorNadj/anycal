"use server";

import type { User, UserProfile } from "../types.ts";
import { database } from "./db/database.ts";

export const getUserProfileAction = async (
  userUuid: User["uuid"],
): Promise<UserProfile> => {
  const user = database.data.users.get(userUuid);
  if (!user) {
    throw new Error("Unknown user");
  }
  return { email: user.email };
};
