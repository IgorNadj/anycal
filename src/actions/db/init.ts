export const initSql = `
  CREATE TABLE IF NOT EXISTS user (
    uuid TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    passwordHash TEXT,
    passwordSalt TEXT
  );

  CREATE TABLE IF NOT EXISTS calendar (
    uuid TEXT PRIMARY KEY,
    userUuid TEXT NOT NULL,
    name TEXT NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY (userUuid)
      REFERENCES user(uuid)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS thing (
    uuid TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    prompt TEXT NOT NULL,
    colour TEXT NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT 1,
    calendarUuid TEXT NOT NULL,
    CONSTRAINT fk_calendar
      FOREIGN KEY (calendarUuid)
      REFERENCES calendar(uuid)
      ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS calendar_event (
    uuid TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    thingUuid TEXT NOT NULL,
    created TEXT NOT NULL,
    lastModified TEXT NOT NULL,
    sequence INTEGER NOT NULL,
    CONSTRAINT fk_thing
      FOREIGN KEY (thingUuid)
      REFERENCES thing(uuid)
      ON DELETE CASCADE
  );
`;
