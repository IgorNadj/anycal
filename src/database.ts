import { DatabaseSync } from "node:sqlite";
import { initSql } from "./sql/init.ts";

const dbPath = process.env.DB_PATH || "/home/db/db.sqlite3";
console.log(`Using database at ${dbPath}`);

export const database = new DatabaseSync(dbPath);

// Enforce foreign key constraints for this connection
// (SQLite requires this PRAGMA to be enabled explicitly)
database.exec("PRAGMA foreign_keys = ON;");

database.exec(initSql);
