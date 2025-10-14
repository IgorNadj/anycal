import { generateIcsCalendar, type IcsCalendar, type IcsEvent } from "ts-ics";
import type { Calendar, CalendarEvent } from "../types.ts";

export function generateICalendar(calendar: Calendar, events: CalendarEvent[]): string {
  const icalEvents: IcsEvent[] = events.map((event) => ({
    uid: event.uuid,
    summary: event.name,
    start: {
      date: event.date,
    },
    end: {
      date: event.date,
    },
    stamp: {
      date: event.created,
    },
    lastModified: {
      date: event.date,
    },
    sequence: event.sequence,
  }));

  const icalCalendar: IcsCalendar = {
    version: "2.0",
    prodId: "-//anycal//anycal 1.0.0//EN",
    name: calendar.name,
    events: icalEvents,
  };

  return generateIcsCalendar(icalCalendar);
}
