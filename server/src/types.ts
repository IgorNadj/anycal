import { Event, Thing } from "@anycal/types";

export type SerialisedEvent = Omit<Event, "date"> & {
  date: string;
};

export type DbThing = Omit<Thing, "visible"> & {
  visible: number;
};
