"use server";

import type { UserProfile } from "../types.ts";
import { ok, validationError } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export type UpdateUserProfileInput = UserProfile & {
  uuid: string;
};

export const updateUserProfileAction = async (input: UpdateUserProfileInput) => {
  const { uuid } = input;

  const email = input.email.trim();

  // If email is changing, ensure it's not in use by another user
  const taken = Object.values(database.data.users).find((u) => u.email === email);
  if (taken?.uuid && taken.uuid !== uuid) {
    return validationError({
      code: "EMAIL_TAKEN",
      message: "Email already in use",
      field: "email",
    });
  }

  await database.update(({ users }) => {
    users[uuid] = {
      ...users[uuid],
      email,
    };
  });

  return ok({});
};
