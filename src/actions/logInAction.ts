"use server";

import { verifyPassword } from "../utils/crypto.ts";
import { ok, validationError } from "../utils/validation.ts";
import { database } from "./db/database.ts";
import { getUserByEmail } from "./db/queries.ts";

export type LogInInput = EmailAndPasswordInput;

type EmailAndPasswordInput = {
  type: "emailAndPassword";
  email: string;
  password: string;
};

export const logInAction = async (input: LogInInput) => {
  if (input.type === "emailAndPassword") {
    return signInWithEmailAndPassword(input);
  }
  throw new Error("Unknown sign in type");
};

const signInWithEmailAndPassword = async (input: EmailAndPasswordInput) => {
  const { email, password } = input;

  const row = getUserByEmail(database, email);

  if (!row) {
    return validationError({
      code: "INVALID_EMAIL_OR_PASSWORD",
      message: "Invalid Email or Password",
      field: "form",
    });
  }

  const verified = verifyPassword(password, row.passwordSalt, row.passwordHash);
  if (!verified) {
    if (!row) {
      return validationError({
        code: "INVALID_EMAIL_OR_PASSWORD",
        message: "Invalid Email or Password",
        field: "form",
      });
    }
  }

  return ok({ userUuid: row.uuid });
};
