"use server";

import { database } from "../database.ts";
import { generateSalt, hashPassword, verifyPassword } from "../utils/crypto.ts";
import { updateUserPassword } from "../sql/mutations.ts";
import { getUserByUuid } from "../sql/queries.ts";
import { ok, validationError } from "../utils/validation.ts";

export type UpdatePasswordInput = {
  uuid: string;
  oldPassword: string;
  newPassword: string;
};

export const updateUserPasswordAction = async (input: UpdatePasswordInput) => {
  const uuid = input.uuid?.trim();
  const oldPassword = input.oldPassword ?? "";
  const newPassword = input.newPassword ?? "";

  if (!uuid || !oldPassword || !newPassword) {
    return validationError({
      code: "INVALID_INPUT",
      message: "Old password and new password are required",
      field: "form",
    });
  }

  const user = getUserByUuid(database, uuid);
  if (!user) {
    return validationError({
      code: "INVALID_USER",
      message: "User not found",
      field: "form",
    });
  }

  const verified = verifyPassword(oldPassword, user.passwordSalt, user.passwordHash);
  if (!verified) {
    return validationError({
      code: "WRONG_PASSWORD",
      message: "Your current password is incorrect",
      field: "oldPassword",
    });
  }

  const newSalt = generateSalt(16);
  const newHash = hashPassword(newPassword, newSalt);
  updateUserPassword(database, uuid, newHash, newSalt);

  return ok({});
};
