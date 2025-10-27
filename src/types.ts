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
  userUuid: string;
};

export type Thing = {
  uuid: string;
  name?: string;
  prompt?: string;
  colour: ThingColour;
  visible: boolean;
  calendarUuid: string;
};

export type CalendarEvent = {
  uuid: string;
  name: string;
  date: Date;
  thingUuid: string;
  created: Date;
  lastModified: Date;
  sequence: number; // revision number
};

export type ThingColour = keyof typeof CALENDAR_COLOURS;

export type NewCalendarEvent = Omit<
  CalendarEvent,
  "created" | "lastModified" | "sequence"
>;

export type UpdateCalendarEvent = Omit<CalendarEvent, "lastModified">;

export type Suggestion = {
  title: string;
  date: Date;
};

export type ThingRun_NormalEvent = {
  uuid: string;
  type: "NormalEvent";
  name: string;
  description: string;
  date: Date;
};

export type ThingRun_SubjectToChangeEvent = {
  uuid: string;
  type: "SubjectToChangeEvent";
  name: string;
  description: string;
  date: Date;
  reason: string; // reason for date likely to change
};

export type ThingRun_UnknownDateEvent = {
  uuid: string;
  type: "UnknownDateEvent";
  name: string;
  description: string;
  reason: string; // reason for no date being known
};

export type ThingRun_VagueDateEvent = {
  uuid: string;
  type: "VagueDateEvent";
  name: string;
  description: string;
  vagueDate: string; // human readable form
  reason: string; // reason for vague date
};

export type ThingRun_Resp = {
  summarisedTitle: string;
  reasonForNoResults: string | null;
  events: (
    | ThingRun_NormalEvent
    | ThingRun_SubjectToChangeEvent
    | ThingRun_UnknownDateEvent
    | ThingRun_VagueDateEvent
  )[];
};

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
