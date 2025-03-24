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
