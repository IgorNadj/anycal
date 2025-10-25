export type ViewMode = "month" | "agenda";

import { CALENDAR_COLOURS } from "./constants.ts";

export type User = UserProfile & {
  uuid: string;
  passwordSalt: string;
  passwordHash: string;
};

export type UserProfile = {
  email: string;
};

export type Calendar = {
  uuid: string;
  name: string;
  colour: CalendarColour;
  visible: boolean;
  userUuid: string;
};

export type CalendarEvent = {
  uuid: string;
  name: string;
  date: Date;
  calendarUuid: string;
  created: Date;
  lastModified: Date;
  sequence: number; // revision number
};

export type NewCalendarEvent = Omit<
  CalendarEvent,
  "created" | "lastModified" | "sequence"
>;

export type UpdateCalendarEvent = Omit<CalendarEvent, "lastModified">;

export type Suggestion = {
  title: string;
  date: Date;
};

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
