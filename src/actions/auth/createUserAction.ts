"use server";

import { database } from "../../database.ts";
import type { UserWithAuth } from "../../types.ts";
import { v4 as uuidv4 } from "uuid";
import { generateSalt, hashPassword } from "../../utils/auth.ts";
import { getUserUuidByEmail } from "../../sql/queries.ts";
import { createUser } from "../../sql/mutations.ts";

export type CreateUserInput = {
  email: string;
  password: string;
};

export type CreateUserError = {
  code: "EMAIL_TAKEN" | "UNKNOWN";
  message: string;
  field?: "email" | "form";
};

export type CreateUserResult =
  | { success: true; userUuid: string }
  | { success: false; error: CreateUserError };

export const createUserAction = async (
  input: CreateUserInput,
): Promise<CreateUserResult> => {
  // Ensure email not used
  const existing = getUserUuidByEmail(database, input.email);
  if (existing?.uuid) {
    return {
      success: false,
      error: {
        code: "EMAIL_TAKEN",
        message: "Email already in use",
        field: "email",
      },
    };
  }

  // Generate a per-user salt and hash the password
  const passwordSalt = generateSalt(16);
  const passwordHash = hashPassword(input.password, passwordSalt);

  const newUserWithAuth: UserWithAuth = {
    uuid: uuidv4(),
    email: input.email,
    passwordHash,
    passwordSalt,
  };

  createUser(database, newUserWithAuth);

  return { success: true, userUuid: newUserWithAuth.uuid };
};
