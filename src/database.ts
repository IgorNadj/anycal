import { DatabaseSync } from "node:sqlite";
import { initSql } from "./sql/init.ts";

export const database = new DatabaseSync("db.sqlite3");

// Enforce foreign key constraints for this connection
// (SQLite requires this PRAGMA to be enabled explicitly)
database.exec("PRAGMA foreign_keys = ON;");

database.exec(initSql);

// Seed a known user for dev/demo convenience
try {
  const initialUser = `INSERT INTO user (uuid) VALUES ('55efff64-f768-4cc0-baaa-0f1312afa190');`;
  database.exec(initialUser);
} catch (e) {
  // ignore if already inserted
}
