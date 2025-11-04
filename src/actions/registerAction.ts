"use server";

import { v4 as uuidv4 } from "uuid";
import type { User } from "../types.ts";
import { generateSalt, hashPassword } from "../utils/crypto.ts";
import { ok, validationError } from "../utils/validation.ts";
import { database } from "./db/database.ts";

export type RegisterInput = {
  email: string;
  password: string;
};

export const registerAction = async (input: RegisterInput) => {
  // Ensure email not used
  const existing = Object.values(database.data.users).find(
    (u) => u.email === input.email,
  );
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

  await database.update(({ users }) => {
    users[newUser.uuid] = newUser;
  });

  // create default calendar
  const newCalendar = {
    uuid: uuidv4(),
    name: "My Calendar",
    userUuid: newUser.uuid,
  };
  await database.update(({ calendars }) => {
    calendars[newCalendar.uuid] = newCalendar;
  });

  return ok({ userUuid: newUser.uuid });
};
