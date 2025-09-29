"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import crypto from "node:crypto";

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInResult =
  | { success: true; user: User }
  | { success: false; error: string; field?: "email" | "password" | "form" };

const hashPassword = (password: string) => {
  const salt = "anycal_salt_v1";
  return crypto
    .createHash("sha256")
    .update(`${salt}:${password}`)
    .digest("hex");
};

export const signInAction = async (input: SignInInput): Promise<SignInResult> => {
  const email = input.email?.trim() ?? "";
  const password = input.password ?? "";

  if (!email || !password) {
    return { success: false, error: "Email and password are required", field: "form" };
  }

  const row = database
    .prepare("SELECT uuid, email, passwordHash FROM user WHERE email = ?")
    .get(email) as
    | { uuid: string; email: string; passwordHash: string }
    | undefined;

  if (!row) {
    return { success: false, error: "Invalid email or password", field: "form" };
  }

  const passwordHash = hashPassword(password);
  if (passwordHash !== row.passwordHash) {
    return { success: false, error: "Invalid email or password", field: "form" };
  }

  return { success: true, user: { uuid: row.uuid, email: row.email } };
};
