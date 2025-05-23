"use client";

import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, Event, ViewMode } from "../types/types.ts";
import { AppContext } from "./AppContext.tsx";
import { useAnycalLocalStorage } from "../hooks/useAnycalLocalStorage.ts";
import { useThings } from "../data/useThings.ts";
import { useEvents } from "../data/useEvents.ts";
import { createThing } from "../data/createThing.ts";
import { createEvent } from "../data/useCreateEvent.ts";
import { updateEvent } from "../data/useUpdateEvent.ts";
import { updateThing } from "../data/updateThing.ts";
import { deleteThing } from "../data/deleteThing.ts";
import { deleteEvent } from "../data/useDeleteEvent.ts";

export type AppContextType = {
  things: Thing[];
  events: Event[];
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingEvent: Event | null;
  setCurrentlyEditingEvent: (event: Event | null) => void;
  createThing: (thing: Thing) => void;
  createEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;
  currentlyEditingThing: Thing | null;
  setCurrentlyEditingThing: (thing: Thing | null) => void;
  updateThing: (thing: Thing) => void;
  deleteThing: (thing: Thing) => void;
};

interface Props {
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const { data: localStorageData, setData: setLocalStorageData } =
    useAnycalLocalStorage();

  const { data: allThings, refetch: refetchThings } = useThings();
  const things = allThings.filter(
    (thing) => localStorageData.thingRefUuids.indexOf(thing.uuid) !== -1,
  );

  const { data: allEvents, refetch: refetchEvents } = useEvents();
  const events = allEvents.filter((event) =>
    things.find((thing) => thing.uuid === event.thingUuid),
  );

  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<Event | null>(null);

  const [currentlyEditingThing, setCurrentlyEditingThing] =
    useState<Thing | null>(null);

  const createThingAndRememberIMadeIt = async (thing: Thing) => {
    console.log("[AppProvider] createThingAndRememberIMadeIt called with thing:", thing);
    console.log("[AppProvider] localStorageData before update:", localStorageData);
    
    await createThing(thing);
    
    const newLocalStorageData = {
      ...localStorageData,
      thingRefUuids: [...localStorageData.thingRefUuids, thing.uuid],
    };
    console.log("[AppProvider] newLocalStorageData to be set:", newLocalStorageData);
    
    setLocalStorageData(newLocalStorageData);
    
    refetchThings();
    refetchEvents();
  };

  const handleCreateEvent = async (event: Event) => {
    await createEvent(event);
    refetchEvents();
  };

  const handleUpdateEvent = async (event: Event) => {
    await updateEvent(event);
    refetchEvents();
  };

  const handleDeleteEvent = async (event: Event) => {
    await deleteEvent(event);
    refetchEvents();
  };

  const handleUpdateThing = async (thing: Thing) => {
    await updateThing(thing);
    refetchThings();
  };

  const handleDeleteThing = async (thing: Thing) => {
    await deleteThing(thing);
    refetchThings();
    refetchEvents();
  };

  const value: AppContextType = {
    things,
    events,
    viewMode,
    setViewMode,
    currentlyEditingEvent,
    setCurrentlyEditingEvent,
    createThing: createThingAndRememberIMadeIt,
    createEvent: handleCreateEvent,
    updateEvent: handleUpdateEvent,
    deleteEvent: handleDeleteEvent,
    currentlyEditingThing,
    setCurrentlyEditingThing,
    updateThing: handleUpdateThing,
    deleteThing: handleDeleteThing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
