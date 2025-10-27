import { enGB, enUS, type Locale } from "date-fns/locale";
import { CALENDAR_COLOURS } from "./constants.ts";
import type { Calendar, CalendarColour, CalendarEvent, Thing } from "./types";

const LOCALES: Record<string, Locale> = {
  "en-GB": enGB,
  "en-US": enUS,
};

export const eventsOnDate = (
  events: CalendarEvent[],
  year: number,
  month: number,
  day: number,
) =>
  events.filter(
    (event) =>
      event.date.getFullYear() === year &&
      event.date.getMonth() === month &&
      event.date.getDate() === day + 1,
  );

// TODO: use var names like monthIndex to avoid confusion
export const daysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

export const getUserLocale = (): Locale => {
  const [localeStr] = navigator.languages;
  return LOCALES[localeStr] ?? enGB;
};

export const getFirstUnusedColour = (things: Thing[]): CalendarColour => {
  for (const colour of objectKeys(CALENDAR_COLOURS)) {
    if (things.every((thing) => thing.colour !== colour)) {
      return colour;
    }
  }
  // ran out of colours
  return "blue_400";
};

export const getEventsForThing = (thing: Thing, allEvents: CalendarEvent[]) =>
  allEvents.filter((event) => event.thingUuid === thing.uuid);

export const getCalendarForEvent = (event: CalendarEvent, allCalendars: Calendar[]) =>
  allCalendars.find((calendar) => calendar.uuid === event.calendarUuid) ?? null;

export const getThingsForCalendar = (calendar: Calendar, allThings: Thing[]) =>
  allThings.filter((thing) => thing.calendarUuid === calendar.uuid);

export const objectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
