import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("db.sqlite3");

const initDatabase = `
    CREATE TABLE IF NOT EXISTS thing (
        uuid TEXT PRIMARY KEY,
        name TEXT NOT NULL, 
        colour TEXT NOT NULL,
        visible BOOLEAN NOT NULL DEFAULT 1
    );
    
    CREATE TABLE IF NOT EXISTS event (
        uuid TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        thingUuid TEXT NOT NULL,
        FOREIGN KEY (thingUuid) REFERENCES thing (uuid)
    );
`;

database.exec(initDatabase);

const createThing = database.prepare(`
  INSERT INTO thing (uuid, name, colour, visible)
  VALUES (?, ?, ?, ?)
`);

const createEvent = database.prepare(`
  INSERT INTO event (uuid, name, date, thingUuid)
  VALUES (?, ?, ?, ?)
`);

const getThings = database.prepare(`
  SELECT * FROM thing
`);

const getEvents = database.prepare(`
  SELECT * FROM event
`);

export { database, createThing, createEvent, getThings, getEvents };
