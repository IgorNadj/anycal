"use server";

import { database } from "../../database.ts";
import { generateSalt, hashPassword, verifyPassword } from "../../utils/auth.ts";
import { getUserWithAuthByUuid } from "../../sql/queries.ts";
import { updateUserPassword } from "../../sql/mutations.ts";

export type UpdatePasswordInput = {
  uuid: string;
  oldPassword: string;
  newPassword: string;
};

export type UpdatePasswordError = {
  code: "USER_NOT_FOUND" | "WRONG_PASSWORD" | "INVALID_INPUT" | "UNKNOWN";
  message: string;
  field?: "oldPassword" | "form";
};

export type UpdatePasswordResult =
  | { success: true }
  | { success: false; error: UpdatePasswordError };

export const updateUserPasswordAction = async (
  input: UpdatePasswordInput,
): Promise<UpdatePasswordResult> => {
  const uuid = input.uuid?.trim();
  const oldPassword = input.oldPassword ?? "";
  const newPassword = input.newPassword ?? "";

  if (!uuid || !oldPassword || !newPassword) {
    return {
      success: false,
      error: {
        code: "INVALID_INPUT",
        message: "Old password and new password are required",
        field: "form",
      },
    };
  }

  const user = getUserWithAuthByUuid(database, uuid);
  if (!user) {
    return {
      success: false,
      error: { code: "USER_NOT_FOUND", message: "User not found", field: "form" },
    };
  }

  const ok = verifyPassword(oldPassword, user.passwordSalt, user.passwordHash);
  if (!ok) {
    return {
      success: false,
      error: {
        code: "WRONG_PASSWORD",
        message: "Your current password is incorrect",
        field: "oldPassword",
      },
    };
  }

  const newSalt = generateSalt(16);
  const newHash = hashPassword(newPassword, newSalt);
  updateUserPassword(database, uuid, newHash, newSalt);

  return { success: true };
};
