"use server";

import { database } from "../database.ts";
import { v4 as uuidv4 } from "uuid";
import { generateSalt, hashPassword } from "../utils/crypto.ts";
import { createUser } from "../sql/mutations.ts";
import type { User } from "../types.ts";
import { getUserByEmail } from "../sql/queries.ts";
import { ok, validationError } from "../utils/validation.ts";

export type RegisterInput = {
  email: string;
  password: string;
};

export const registerAction = async (input: RegisterInput) => {
  // Ensure email not used
  const existing = getUserByEmail(database, input.email);
  if (existing?.uuid) {
    return validationError({
      code: "EMAIL_TAKEN",
      message: "Email already in use",
      field: "email",
    });
  }

  // Generate a per-user salt and hash the password
  const passwordSalt = generateSalt(16);
  const passwordHash = hashPassword(input.password, passwordSalt);

  const newUser: User = {
    uuid: uuidv4(),
    email: input.email,
    passwordHash,
    passwordSalt,
  };

  createUser(database, newUser);

  return ok({ userUuid: newUser.uuid });
};
