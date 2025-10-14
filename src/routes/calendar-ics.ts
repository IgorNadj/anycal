import type { Express } from "express";

export const calendarIcs = (app: Express) => {
  app.get("/api/calendar.ics", (req, res) => {
    res.status(200).send("Hello World");
  });
};
