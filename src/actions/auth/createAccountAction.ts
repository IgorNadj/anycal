"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import crypto from "node:crypto";
import { sendWelcomeEmail } from "../../services/emailService.ts";
import { generateSalt, hashPassword } from "../../utils/auth.ts";
import { selectUserUuidByEmail } from "../../sql/queries.ts";
import { createUser } from "../../sql/mutations.ts";

export type CreateAccountInput = {
  email: string;
  password: string;
};

export const createAccountAction = async (
  input: CreateAccountInput,
): Promise<User> => {
  const uuid = crypto.randomUUID();

  // Ensure email not used
  const existing = selectUserUuidByEmail(database, input.email);
  if (existing?.uuid) {
    throw new Error("Email already in use");
  }

  // Generate a per-user salt and hash the password
  const salt = generateSalt(16);
  const passwordHash = hashPassword(input.password, salt);

  createUser(database, {
    uuid,
    email: input.email,
    passwordHash,
    passwordSalt: salt,
  });

  // Stubbed email notification
  try {
    await sendWelcomeEmail(input.email);
  } catch (e) {
    // ignore stub errors
  }

  return { uuid, email: input.email };
};
