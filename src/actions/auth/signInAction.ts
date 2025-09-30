"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import { verifyPassword } from "../../utils/auth.ts";
import { selectUserAuthByEmail } from "../../sql/queries.ts";

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInResult =
  | { success: true; user: User }
  | { success: false; error: string; field?: "email" | "password" | "form" };

export const signInAction = async (input: SignInInput): Promise<SignInResult> => {
  const email = input.email?.trim() ?? "";
  const password = input.password ?? "";

  if (!email || !password) {
    return { success: false, error: "Email and password are required", field: "form" };
  }

  const row = selectUserAuthByEmail(database, email);

  if (!row) {
    return { success: false, error: "Invalid email or password", field: "form" };
  }

  const ok = verifyPassword(password, row.passwordSalt, row.passwordHash);
  if (!ok) {
    return { success: false, error: "Invalid email or password", field: "form" };
  }

  return { success: true, user: { uuid: row.uuid, email: row.email } };
};
