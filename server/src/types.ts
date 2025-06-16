import { Event, Thing } from "../../web/src/types.ts";

export type SerialisedEvent = Omit<Event, "date"> & {
  date: string;
};

export type DbThing = Omit<Thing, "visible"> & {
  visible: number;
};
