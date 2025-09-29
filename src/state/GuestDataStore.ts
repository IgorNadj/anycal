import type { Calendar, CalendarEvent } from "../types.ts";

const state: {
  calendars: Map<Calendar["uuid"], Calendar>;
  events: Map<CalendarEvent["uuid"], CalendarEvent>;
} = {
  calendars: new Map(),
  events: new Map(),
};

export const GuestDataStore = {
  calendars: {
    get: () => Array.from(state.calendars.values()),
    create: (calendar: Calendar) => {
      state.calendars.set(calendar.uuid, calendar);
    },
    update: (calendar: Calendar) => {
      state.calendars.get(calendar.uuid) &&
        state.calendars.set(calendar.uuid, calendar);
    },
    delete: (calendar: Calendar) => {
      state.calendars.delete(calendar.uuid);
    },
  },

  events: {
    get: () => Array.from(state.events.values()),
    create: (event: CalendarEvent) => {
      state.events.set(event.uuid, event);
    },
    update: (event: CalendarEvent) => {
      state.events.get(event.uuid) && state.events.set(event.uuid, event);
    },
    delete: (event: CalendarEvent) => {
      state.events.delete(event.uuid);
    },
  },
};
