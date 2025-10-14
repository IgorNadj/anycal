import type { Express } from "express";
import { database } from "../database.ts";
import { getCalendarByUuid, getEventsByCalendarUuid } from "../sql/queries.ts";
import { generateICalendar } from "../utils/ical.ts";

export const calendarIcs = (app: Express) => {
  app.get("/subscribe", (req, res) => {
    try {
      const calendarUuid = req.query.uuid as string;

      if (!calendarUuid) {
        return res.status(400).json({ error: "Missing calendar parameter" });
      }

      // Get calendar
      const calendar = getCalendarByUuid(database, calendarUuid);
      if (!calendar) {
        return res.status(404).json({ error: "Calendar not found" });
      }

      // Get events for this calendar
      const events = getEventsByCalendarUuid(database, calendarUuid);

      // Find the most recent lastModified date
      const mostRecentModified =
        events.length > 0
          ? events.reduce(
              (latest, event) =>
                event.lastModified > latest ? event.lastModified : latest,
              events[0].lastModified,
            )
          : new Date();

      // Generate iCal content
      const icalContent = generateICalendar(calendar, events);

      res.setHeader("Content-Type", "text/calendar; charset=utf-8");
      res.setHeader("Last-Modified", mostRecentModified.toUTCString());
      res.status(200).send(icalContent);
    } catch (error) {
      console.error("Error generating calendar:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
