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

// Thing operations
const createThing = database.prepare(`
  INSERT INTO thing (uuid, name, colour, visible)
  VALUES (?, ?, ?, ?)
`);

const getThings = database.prepare(`
  SELECT * FROM thing
`);

const updateThing = database.prepare(`
  UPDATE thing 
  SET name = ?, colour = ?, visible = ?
  WHERE uuid = ?
`);

const deleteThing = database.prepare(`
  DELETE FROM thing WHERE uuid = ?
`);

// Event operations
const createEvent = database.prepare(`
  INSERT INTO event (uuid, name, date, thingUuid)
  VALUES (?, ?, ?, ?)
`);

const getEvents = database.prepare(`
  SELECT * FROM event
`);

const updateEvent = database.prepare(`
  UPDATE event 
  SET name = ?, date = ?, thingUuid = ?
  WHERE uuid = ?
`);

const deleteEvent = database.prepare(`
  DELETE FROM event WHERE uuid = ?
`);

// Utility queries
const getEventCountByThingUuid = database.prepare(`
  SELECT COUNT(*) as count FROM event WHERE thingUuid = ?
`);

const deleteEventsByThingUuid = database.prepare(`
  DELETE FROM event WHERE thingUuid = ?
`);

export {
  database,
  createThing,
  getThings,
  updateThing,
  deleteThing,
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventCountByThingUuid,
  deleteEventsByThingUuid,
};
