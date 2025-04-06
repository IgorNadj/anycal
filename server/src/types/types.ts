import { CALENDAR_COLOURS } from "../constants";

export type Thing = {
  uuid: string;
  name: string;
  colour: CalendarColour;
  visible: boolean;
};

export type Event = {
  uuid: string;
  name: string;
  date: Date;
  thingUuid: string;
};

export type SerialisedEvent = Omit<Event, "date"> & {
  date: string;
};

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
