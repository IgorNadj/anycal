"use server";

import { database } from "../../database.ts";
import type { User } from "../../types.ts";
import crypto from "node:crypto";

export type UpdateSettingsInput = {
  uuid: string;
  email?: string;
  password?: string;
};

const hashPassword = (password: string) => {
  const salt = "anycal_salt_v1";
  return crypto
    .createHash("sha256")
    .update(`${salt}:${password}`)
    .digest("hex");
};

export const updateSettingsAction = async (
  input: UpdateSettingsInput,
): Promise<User> => {
  const updates: string[] = [];
  const params: any[] = [];

  if (typeof input.email === "string") {
    updates.push("email = ?");
    params.push(input.email);
  }
  if (typeof input.password === "string" && input.password.length > 0) {
    updates.push("passwordHash = ?");
    params.push(hashPassword(input.password));
  }

  if (updates.length === 0) {
    const current = database
      .prepare("SELECT uuid, email FROM user WHERE uuid = ?")
      .get(input.uuid) as { uuid: string; email: string | null } | undefined;
    if (!current) throw new Error("User not found");
    return { uuid: current.uuid, email: current.email };
  }

  params.push(input.uuid);

  const sql = `UPDATE user SET ${updates.join(", ")} WHERE uuid = ?`;
  database.prepare(sql).run(...params);

  const row = database
    .prepare("SELECT uuid, email FROM user WHERE uuid = ?")
    .get(input.uuid) as { uuid: string; email: string | null } | undefined;

  if (!row) throw new Error("User not found");

  return { uuid: row.uuid, email: row.email };
};
