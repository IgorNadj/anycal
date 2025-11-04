"use server";

import { verifyPassword } from "../utils/crypto.ts";
import { ok, validationError } from "../utils/validation.ts";
import { database } from "./db/database.ts";

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

  const user = await Array.from(database.data.users.values()).find(
    (u) => u.email === email,
  );

  if (!user) {
    return validationError({
      code: "INVALID_EMAIL_OR_PASSWORD",
      message: "Invalid Email or Password",
      field: "form",
    });
  }

  const verified = verifyPassword(password, user.passwordSalt, user.passwordHash);
  if (!verified) {
    return validationError({
      code: "INVALID_EMAIL_OR_PASSWORD",
      message: "Invalid Email or Password",
      field: "form",
    });
  }

  return ok({ userUuid: user.uuid });
};
