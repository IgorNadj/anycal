import { DatabaseSync } from "node:sqlite";

export const database = new DatabaseSync("db.sqlite3");

const initDatabase = `
  CREATE TABLE IF NOT EXISTS user (
      uuid TEXT PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS calendar (
    uuid TEXT PRIMARY KEY,
    userUuid TEXT NOT NULL,
    name TEXT NOT NULL, 
    colour TEXT NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT 1,
    CONSTRAINT fk_user
      FOREIGN KEY (userUuid)
      REFERENCES user(uuid)
      ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS calendar_event (
    uuid TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    calendarUuid TEXT NOT NULL,
    CONSTRAINT fk_calendar
      FOREIGN KEY (calendarUuid)
      REFERENCES calendar(uuid)
      ON DELETE CASCADE
  );
`;

database.exec(initDatabase);

try {
  const initialUser = `INSERT INTO user (uuid) VALUES ('55efff64-f768-4cc0-baaa-0f1312afa190');`;
  database.exec(initialUser);
} catch (e) {
  //
}
