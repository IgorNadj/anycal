"use server";

import { v4 as uuidv4 } from "uuid";
import { database } from "../database.ts";
import type { User } from "../types.ts";
import { generateSalt, hashPassword } from "../utils/crypto.ts";
import { ok, validationError } from "../utils/validation.ts";
import { createCalendar, createUser } from "./db/mutations.ts";
import { getUserByEmail } from "./db/queries.ts";

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

  // create default calendar
  createCalendar(database, {
    uuid: uuidv4(),
    name: "My Calendar",
    colour: "blue_400",
    visible: true,
    userUuid: newUser.uuid,
  });

  return ok({ userUuid: newUser.uuid });
};
