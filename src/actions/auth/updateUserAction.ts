"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import { generateSalt, hashPassword } from "../../utils/auth.ts";
import { getUser, getUserUuidByEmail } from "../../sql/queries.ts";

export type UpdateUserInput = {
  uuid: string;
  email?: string;
  password?: string;
};

export type UpdateUserError = {
  code: "EMAIL_TAKEN" | "USER_NOT_FOUND" | "UNKNOWN";
  message: string;
  field?: "email" | "form" | "password";
};

export type UpdateUserResult =
  | { success: true; user: User }
  | { success: false; error: UpdateUserError };

export const updateUserAction = async (
  input: UpdateUserInput,
): Promise<UpdateUserResult> => {
  const { uuid } = input;

  // If user does not exist, return structured error
  const existingUser = getUser(database, uuid);
  if (!existingUser) {
    return {
      success: false,
      error: { code: "USER_NOT_FOUND", message: "User not found", field: "form" },
    };
  }

  const updates: string[] = [];
  const params: any[] = [];

  if (typeof input.email === "string") {
    const email = input.email.trim();
    // If email is changing, ensure it's not in use by another user
    if (email && email !== existingUser.email) {
      const taken = getUserUuidByEmail(database, email);
      if (taken?.uuid && taken.uuid !== uuid) {
        return {
          success: false,
          error: {
            code: "EMAIL_TAKEN",
            message: "Email already in use",
            field: "email",
          },
        };
      }
    }
    updates.push("email = ?");
    params.push(email);
  }

  if (typeof input.password === "string" && input.password.length > 0) {
    const salt = generateSalt(16);
    const hash = hashPassword(input.password, salt);
    updates.push("passwordHash = ?", "passwordSalt = ?");
    params.push(hash, salt);
  }

  if (updates.length === 0) {
    return { success: true, user: existingUser };
  }

  params.push(uuid);
  const sql = `UPDATE user SET ${updates.join(", ")} WHERE uuid = ?`;
  database.prepare(sql).run(...params);

  const updated = getUser(database, uuid);
  return { success: true, user: updated };
};
