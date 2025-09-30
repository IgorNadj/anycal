import { DatabaseSync } from "node:sqlite";
import { initSql } from "./sql/init.ts";

export const database = new DatabaseSync("db.sqlite3");

// Enforce foreign key constraints for this connection
// (SQLite requires this PRAGMA to be enabled explicitly)
database.exec("PRAGMA foreign_keys = ON;");

database.exec(initSql);
