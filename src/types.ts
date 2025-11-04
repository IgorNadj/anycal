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
  name: string;
  prompt?: string;
  reasonForNoResults?: string;
  reasonForFailureToGenerateName?: string;
  colour: ThingColour;
  visible: boolean;
  calendarUuid: string;
};

export type Suggestion = {
  title: string;
  date: Date;
};

type BaseEvent = {
  uuid: string;
  name: string;
  description: string;
  thingUuid: string;
  created: Date;
  lastModified: Date;
  sequence: number; // revision number
};

export type NormalEvent = BaseEvent & {
  type: "NormalEvent";
  date: Date;
};

export type SubjectToChangeEvent = BaseEvent & {
  type: "SubjectToChangeEvent";
  date: Date;
  reason: string; // reason for date likely to change
};

export type UnknownDateEvent = BaseEvent & {
  type: "UnknownDateEvent";
  reason: string; // reason for no date being known
};

export type VagueDateEvent = BaseEvent & {
  type: "VagueDateEvent";
  vagueDate: string; // human readable form
  reason: string; // reason for vague date
};

export type EventsWithSpecificDate = NormalEvent | SubjectToChangeEvent;

export type CalendarEvent =
  | NormalEvent
  | SubjectToChangeEvent
  | UnknownDateEvent
  | VagueDateEvent;

// export type NewCalendarEvent = Omit<
//   CalendarEvent,
//   "created" | "lastModified" | "sequence"
// >;
//
// export type UpdateCalendarEvent = Omit<CalendarEvent, "lastModified">;

export type ThingColour = keyof typeof CALENDAR_COLOURS;
export type CalendarColour = keyof typeof CALENDAR_COLOURS;
