import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, Event, ViewMode } from "../types/types.ts";
import { AppContext } from "./AppContext.tsx";
import { useQuery } from "@tanstack/react-query";

export type AppContextType = {
  things: Thing[];
  events: Event[];
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingEvent: Event | null;
  setCurrentlyEditingEvent: (event: Event | null) => void;
  addNewThingToCalendar: (thing: Thing, event: Event) => void;
  saveEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;
  resetWithFakeData: () => void;
  currentlyEditingThing: Thing | null;
  setCurrentlyEditingThing: (thing: Thing | null) => void;
  saveThing: (thing: Thing) => void;
  deleteThing: (thing: Thing) => void;
};

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  // const { data, setData } = usePersistedThings();
  // const { things, events } = data;

  const { data: data1, isFetched: isFetched1 } = useQuery({
    queryKey: ["things"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/things");
      return await response.json();
    },
  });
  const things: Thing[] = data1;

  const { data: data2, isFetched: isFetched2 } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/events");
      const asJson = await response.json();

      type SerializedEvent = Omit<Event, "date"> & {
        date: string;
      };

      return asJson.map((event: SerializedEvent) => ({
        ...event,
        date: new Date(event.date),
      }));
    },
  });
  const events: Event[] = data2;

  // const { date: things } = useQuery("things", () =>
  // const response = await fetch({
  //     method: "get",
  //     url: "http://localhost:3000/things",
  //     responseType: 'json'
  //   }),
  //   );)

  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<Event | null>(null);

  const [currentlyEditingThing, setCurrentlyEditingThing] =
    useState<Thing | null>(null);

  const addNewThingToCalendar = (thing: Thing, event: Event) => {
    console.log("adding", thing, event);
    const newThings = [...things, thing];
    const newEvents = [...events, event];
    // setData({ ...data, things: newThings, events: newEvents });
    console.log("newThings", newThings);
    console.log("newEvents", newEvents);
  };

  const saveEvent = (event: Event) => {
    console.log("saveEvent", event);
    const newEvents = [...events.filter((e) => e.uuid !== event.uuid), event];
    // setData({ ...data, events: newEvents });
    console.log("newEvents", newEvents);
  };

  const deleteEvent = (event: Event) => {
    console.log("deleteEvent", event);
    const newEvents = events.filter((e) => e.uuid !== event.uuid);
    // setData({ ...data, events: newEvents });
    console.log("newEvents", newEvents);
  };

  const saveThing = (thing: Thing) => {
    console.log("saveThing", thing);
    const newThings = things.map((t) => (t.uuid === thing.uuid ? thing : t));
    // setData({ ...data, things: newThings });
    console.log("newThings", newThings);
  };

  const deleteThing = (thing: Thing) => {
    console.log("deleteThing", thing);
    const newThings = things.filter((t) => t.uuid !== thing.uuid);
    // setData({ ...data, things: newThings });
    console.log("newThings", newThings);
  };

  const resetWithFakeData = () => {
    // setData({ ...data, events: FAKE_EVENTS, things: FAKE_THINGS });
  };

  const value: AppContextType = {
    things: isFetched1 ? things : [],
    events: isFetched2 ? events : [],
    viewMode,
    setViewMode,
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    addNewThingToCalendar,
    saveEvent,
    deleteEvent,
    currentlyEditingThing,
    setCurrentlyEditingThing,
    saveThing,
    deleteThing,
    resetWithFakeData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
