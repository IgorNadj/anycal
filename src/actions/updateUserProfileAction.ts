"use server";

import { database } from "../database.ts";
import type { UserProfile } from "../types.ts";
import { getUserByEmail } from "../sql/queries.ts";
import { updateUserProfile } from "../sql/mutations.ts";
import { ok, validationError } from "../utils/validation.ts";

export type UpdateUserProfileInput = UserProfile & {
  uuid: string;
};

export const updateUserProfileAction = async (input: UpdateUserProfileInput) => {
  const { uuid } = input;

  const email = input.email.trim();

  // If email is changing, ensure it's not in use by another user
  const taken = getUserByEmail(database, email);
  if (taken?.uuid && taken.uuid !== uuid) {
    return validationError({
      code: "EMAIL_TAKEN",
      message: "Email already in use",
      field: "email",
    });
  }

  updateUserProfile(database, uuid, email);

  return ok({});
};
