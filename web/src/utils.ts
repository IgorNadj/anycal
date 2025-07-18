import { enGB, enUS, Locale } from "date-fns/locale";
import { CalendarColour, Event, Thing } from "./types";
import { CALENDAR_COLOURS } from "./constants.ts";

const LOCALES: Record<string, Locale> = {
  "en-GB": enGB,
  "en-US": enUS,
};

export const eventsOnDate = (
  events: Event[],
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

export const getEventsForThing = (thing: Thing, allEvents: Event[]) =>
  allEvents.filter((event) => event.thingUuid === thing.uuid);

export const getThingForEvent = (event: Event, allThings: Thing[]) =>
  allThings.find((thing) => thing.uuid === event.thingUuid) ?? null;

export const objectKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;
