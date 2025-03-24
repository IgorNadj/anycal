export type Thing = {
  uuid: string;
  name: string;
  colour: string;
};

export type Event = {
  uuid: string;
  name: string;
  date: Date;
  thingUuid: string;
};

export type ViewMode = "compact" | "expanded";
