import { parse, stringify } from "superjson";
import type { Calendar, CalendarEvent } from "../types.ts";

let state: {
  calendars: Record<Calendar["uuid"], Calendar>;
  events: Record<CalendarEvent["uuid"], CalendarEvent>;
} = {
  calendars: {},
  events: {},
};

const persist = () => {
  localStorage.setItem("anycal_guest_data", stringify(state));
};

const load = () => {
  const raw = localStorage.getItem("anycal_guest_data");
  if (!raw) return;
  state = parse(raw);
};

load();

export const GuestDataStore = {
  calendars: {
    get: () => Array.from(Object.values(state.calendars)),
    create: (calendar: Calendar) => {
      state.calendars[calendar.uuid] = calendar;
      persist();
    },
    update: (calendar: Calendar) => {
      state.calendars[calendar.uuid] = calendar;
      persist();
    },
    delete: (calendar: Calendar) => {
      delete state.calendars[calendar.uuid];
      persist();
    },
  },

  events: {
    get: () => Array.from(Object.values(state.events)),
    create: (event: CalendarEvent) => {
      state.events[event.uuid] = event;
      persist();
    },
    update: (event: CalendarEvent) => {
      state.events[event.uuid] = event;
      persist();
    },
    delete: (event: CalendarEvent) => {
      delete state.events[event.uuid];
      persist();
    },
  },
};
