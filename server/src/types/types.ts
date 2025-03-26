import { CALENDAR_COLOURS } from "../constants";

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

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
