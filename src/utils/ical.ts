import { createEvents, type EventAttributes } from "ics";
import type { Calendar, CalendarEvent } from "../types.ts";

export function generateICalendar(calendar: Calendar, events: CalendarEvent[]): string {
  const icalEvents: EventAttributes[] = events.map((event) => ({
    uid: event.uuid,
    title: event.name,
    start: [event.date.getFullYear(), event.date.getMonth() + 1, event.date.getDate()],
    startInputType: "local",
    duration: { hours: 1 }, // Default 1 hour duration
    productId: "anycal/1.0.0",
    calName: calendar.name,
    created: [
      event.created.getFullYear(),
      event.created.getMonth() + 1,
      event.created.getDate(),
      event.created.getHours(),
      event.created.getMinutes(),
    ],
    lastModified: [
      event.lastModified.getFullYear(),
      event.lastModified.getMonth() + 1,
      event.lastModified.getDate(),
      event.lastModified.getHours(),
      event.lastModified.getMinutes(),
    ],
    sequence: event.sequence,
  }));

  const { error, value } = createEvents(icalEvents);

  if (error) {
    throw new Error(`Failed to generate iCal: ${error.message}`);
  }

  return value || "";
}
