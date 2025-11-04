import type { Express } from "express";
import { database } from "../actions/db/database.ts";
import type { EventsWithSpecificDate } from "../types.ts";
import { generateICalendar } from "../utils/ical.ts";

export const calendarIcs = (app: Express) => {
  app.get("/subscribe", (req, res) => {
    try {
      const calendarUuid = req.query.uuid as string;

      if (!calendarUuid) {
        return res.status(400).json({ error: "Missing calendar parameter" });
      }

      // Get calendar
      const calendar = database.data.calendars.get(calendarUuid);
      if (!calendar) {
        return res.status(404).json({ error: "Calendar not found" });
      }

      // Get events for this calendar
      const thingUuids = new Set(
        Array.from(database.data.things.values())
          .filter((e) => e.calendarUuid === calendar.uuid)
          .map((e) => e.uuid),
      );
      const events = Array.from(database.data.events.values()).filter((e) =>
        thingUuids.has(e.thingUuid),
      );
      const eventsWithSpecificDate: EventsWithSpecificDate[] = events.filter(
        (e) => e.type === "NormalEvent" || e.type === "SubjectToChangeEvent",
      );

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
      const icalContent = generateICalendar(calendar, eventsWithSpecificDate);

      res.setHeader("Content-Type", "text/calendar; charset=utf-8");
      res.setHeader("Last-Modified", mostRecentModified.toUTCString());
      res.status(200).send(icalContent);
    } catch (error) {
      console.error("Error generating calendar:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
