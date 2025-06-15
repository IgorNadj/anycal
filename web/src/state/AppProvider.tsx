import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, Event } from "../types/types.ts";
import {AppContext, AppContextType} from "./AppContext.tsx";
import { useAnycalLocalStorage } from "../hooks/useAnycalLocalStorage.ts";
import { useThings } from "../data/useThings.ts";
import { useEvents } from "../data/useEvents.ts";
import { useCreateThing } from "../data/useCreateThing.ts";
import { useCreateEvent } from "../data/useCreateEvent.ts";
import { useUpdateEvent } from "../data/useUpdateEvent.ts";
import { useUpdateThing } from "../data/useUpdateThing.ts";
import { useDeleteThing } from "../data/useDeleteThing.ts";
import { useDeleteEvent } from "../data/useDeleteEvent.ts";


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

  const createThingAndRememberIMadeIt = (thing: Thing) => {
    createThing(thing);
    setLocalStorageData({
      ...localStorageData,
      thingRefUuids: [...localStorageData.thingRefUuids, thing.uuid],
    });
  };

  const value: AppContextType = {
    things,
    events,
    viewMode,
    setViewMode,
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    createThing: createThingAndRememberIMadeIt,
    createEvent,
    updateEvent,
    deleteEvent,
    currentlyEditingThing,
    setCurrentlyEditingThing,
    updateThing,
    deleteThing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
