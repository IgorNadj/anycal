import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, Event, ViewMode } from "../types/types.ts";
import { AppContext } from "./AppContext.tsx";
import { useAnycalLocalStorage } from "../hooks/useAnycalLocalStorage.ts";
import { useThings } from "../data/useThings.ts";
import { useEvents } from "../data/useEvents.ts";
import { useCreateThing } from "../data/useCreateThing.ts";
import { useCreateEvent } from "../data/useCreateEvent.ts";

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
  const { data: localStorageData, setData: setLocalStorageData } =
    useAnycalLocalStorage();

  const { data: allThings } = useThings();
  const things = allThings.filter(
    (thing) => localStorageData.thingRefUuids.indexOf(thing.uuid) !== -1,
  );

  const { data: allEvents } = useEvents();
  const events = allEvents.filter((event) =>
    things.find((thing) => thing.uuid === event.thingUuid),
  );

  const { mutate: createThing } = useCreateThing();
  const { mutate: createEvent } = useCreateEvent();

  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<Event | null>(null);

  const [currentlyEditingThing, setCurrentlyEditingThing] =
    useState<Thing | null>(null);

  const addNewThingToCalendar = (thing: Thing, event: Event) => {
    console.log("adding", thing, event);
    const newThings = [...things, thing];
    const newEvents = [...events, event];
    createThing(thing);
    createEvent(event);
    const newLocalStorageData = {
      ...localStorageData,
      thingRefUuids: [...localStorageData.thingRefUuids, thing.uuid],
    };
    setLocalStorageData(newLocalStorageData);
    console.log("newThings", newThings);
    console.log("newEvents", newEvents);
    console.log("newLocalStorageData", newLocalStorageData);
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
    things,
    events,
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
