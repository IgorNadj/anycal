"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import crypto from "node:crypto";
import { sendWelcomeEmail } from "../../services/emailService.ts";

export type CreateAccountInput = {
  email: string;
  password: string;
};

const hashPassword = (password: string) => {
  // Simple salted sha256 hash for demo purposes (stub). In production use bcrypt/argon2.
  const salt = "anycal_salt_v1";
  return crypto
    .createHash("sha256")
    .update(`${salt}:${password}`)
    .digest("hex");
};

export const createAccountAction = async (
  input: CreateAccountInput,
): Promise<User> => {
  const uuid = crypto.randomUUID();
  const passwordHash = hashPassword(input.password);

  // Ensure email not used
  const existing = database
    .prepare("SELECT uuid FROM user WHERE email = ?")
    .get(input.email) as { uuid?: string } | undefined;
  if (existing?.uuid) {
    throw new Error("Email already in use");
  }

  database
    .prepare(
      "INSERT INTO user (uuid, email, passwordHash) VALUES (?, ?, ?)",
    )
    .run(uuid, input.email, passwordHash);

  // Stubbed email notification
  try {
    await sendWelcomeEmail(input.email);
  } catch (e) {
    // ignore stub errors
  }

  return { uuid, email: input.email };
};
