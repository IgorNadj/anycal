"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import { verifyPassword } from "../../utils/auth.ts";
import {
  getUserWithAuthByEmail,
  getUserWithAuthByUuid,
} from "../../sql/queries.ts";

export type SignInInput = EmailAndPasswordInput | UuidInput;

type EmailAndPasswordInput = {
  type: "emailAndPassword";
  email: string;
  password: string;
};

type UuidInput = {
  // TODO: do this better... use a jwt
  type: "uuid";
  userUuid: string;
};

export type SignInResult =
  | { success: true; user: User }
  | { success: false; error: string; field?: "email" | "password" | "form" };

export const signInAction = async (
  input: SignInInput,
): Promise<SignInResult> => {
  if (input.type === "emailAndPassword") {
    return signInWithEmailAndPassword(input);
  } else if (input.type === "uuid") {
    return signInWithUuid(input);
  }
  throw new Error("Unknown sign in type");
};

const signInWithEmailAndPassword = async (
  input: EmailAndPasswordInput,
): Promise<SignInResult> => {
  const { email, password } = input;

  const row = getUserWithAuthByEmail(database, email);

  if (!row) {
    return {
      success: false,
      error: "Invalid email or password",
      field: "form",
    };
  }

  const ok = verifyPassword(password, row.passwordSalt, row.passwordHash);
  if (!ok) {
    return {
      success: false,
      error: "Invalid email or password",
      field: "form",
    };
  }

  return { success: true, user: { uuid: row.uuid, email: row.email } };
};

const signInWithUuid = async (input: UuidInput): Promise<SignInResult> => {
  const { userUuid } = input;

  const row = getUserWithAuthByUuid(database, userUuid);

  if (!row) {
    return {
      success: false,
      error: "No user found with that UUID",
      field: "form",
    };
  }

  return { success: true, user: { uuid: row.uuid, email: row.email } };
};
