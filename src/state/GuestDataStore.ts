import { parse, stringify } from "superjson";
import type { Calendar, CalendarEvent } from "../types.ts";
import { v4 as uuidv4 } from "uuid";

type GuestDataState = {
  calendars: Record<Calendar["uuid"], Calendar>;
  events: Record<CalendarEvent["uuid"], CalendarEvent>;
  guestUserUuid: string;
};

let state: GuestDataState;

const persist = () => {
  localStorage.setItem("anycal_guest_data", stringify(state));
};

// Init
const raw = localStorage.getItem("anycal_guest_data");
if (raw) {
  state = parse(raw) as GuestDataState;
} else {
  const newGuestUserUuid = uuidv4();
  const newCalendarUuid = uuidv4();
  state = {
    calendars: {
      [newCalendarUuid]: {
        uuid: newCalendarUuid,
        name: "My Calendar",
        colour: "blue_400",
        visible: true,
        userUuid: newGuestUserUuid,
      },
    },
    events: {},
    guestUserUuid: newGuestUserUuid,
  };
  persist();
}

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

  guestUserUuid: state.guestUserUuid,
};
