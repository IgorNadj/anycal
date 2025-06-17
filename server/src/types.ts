import { Event, Thing } from "../../web/src/types.ts";

export type DbEvent = Omit<Event, "date"> & {
  date: string;
};

export type DbThing = Omit<Thing, "visible"> & {
  visible: number;
};
