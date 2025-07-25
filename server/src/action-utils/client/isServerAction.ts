import { extname } from "./extname.ts";

export const isServerAction = (id: string, code: string) => {
  const ext = extname(id);
  if (ext === ".ts") {
    return code.startsWith("'use server'") || code.startsWith('"use server"');
  }
  return false;
};
