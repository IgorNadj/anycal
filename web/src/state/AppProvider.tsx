import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, Event, ViewMode } from "../types/types.ts";
import { AppContext } from "./AppContext.tsx";
import { useAnycalLocalStorage } from "../hooks/useAnycalLocalStorage.ts";
import { useThings } from "../data/useThings.ts";
import { useEvents } from "../data/useEvents.ts";
import { useCreateThing } from "../data/useCreateThing.ts";
import { useCreateEvent } from "../data/useCreateEvent.ts";
import { useUpdateEvent } from "../data/useUpdateEvent.ts";
import { useUpdateThing } from "../data/useUpdateThing.ts";
import { useDeleteThing } from "../data/useDeleteThing.ts";
import { useDeleteEvent } from "../data/useDeleteEvent.ts";

export type AppContextType = {
  things: Thing[];
  events: Event[];
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingEvent: Event | null;
  setCurrentlyEditingEvent: (event: Event | null) => void;
  addNewThingToCalendar: (thing: Thing, event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;
  resetWithFakeData: () => void;
  currentlyEditingThing: Thing | null;
  setCurrentlyEditingThing: (thing: Thing | null) => void;
  updateThing: (thing: Thing) => void;
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
  const { mutate: updateThing } = useUpdateThing();
  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteThing } = useDeleteThing();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<Event | null>(null);

  const [currentlyEditingThing, setCurrentlyEditingThing] =
    useState<Thing | null>(null);

  const addNewThingToCalendar = (thing: Thing, event: Event) => {
    createThing(thing);
    createEvent(event);
    const newLocalStorageData = {
      ...localStorageData,
      thingRefUuids: [...localStorageData.thingRefUuids, thing.uuid],
    };
    setLocalStorageData(newLocalStorageData);
    console.log("newLocalStorageData", newLocalStorageData);
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
    updateEvent,
    deleteEvent,
    currentlyEditingThing,
    setCurrentlyEditingThing,
    updateThing,
    deleteThing,
    resetWithFakeData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
