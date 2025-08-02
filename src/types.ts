export type ViewMode = "compact" | "expanded";

import { CALENDAR_COLOURS } from "./constants.ts";

export type User = {
  uuid: string;
};

export type Thing = {
  uuid: string;
  name: string;
  colour: CalendarColour;
  visible: boolean;
  userUuid: string;
};

export type Event = {
  uuid: string;
  name: string;
  date: Date;
  thingUuid: string;
};

export type Suggestion = {
  title: string;
  date: Date;
};

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
