import { CALENDAR_COLOURS } from "../constants.ts";

export type Thing = {
  uuid: string;
  name: string;
  colour: string;
  visible: boolean;
};

export type Event = {
  uuid: string;
  name: string;
  date: Date;
  thingUuid: string;
};

export type ViewMode = "compact" | "expanded";

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
