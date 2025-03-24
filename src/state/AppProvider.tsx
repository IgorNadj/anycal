import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, Event, ViewMode } from "../types/types.ts";
import { usePersistedThings } from "../hooks/usePersistedThings.ts";
import { AppContext } from "./AppContext.tsx";
import { FAKE_EVENTS, FAKE_THINGS } from "../fakedata.ts";

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
};

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const { data, setData } = usePersistedThings();
  const { things, events } = data;

  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  const [currentlyEditingEvent, setCurrentlyEditingEvent] =
    useState<Event | null>(null);

  const addNewThingToCalendar = (thing: Thing, event: Event) => {
    console.log("adding", thing, event);
    const newThings = [...things, thing];
    const newEvents = [...events, event];
    setData({ ...data, things: newThings, events: newEvents });
    console.log("newThings", newThings);
    console.log("newEvents", newEvents);
  };

  const saveEvent = (event: Event) => {
    console.log("saveEvent", event);
    const newEvents = [...events.filter((e) => e.uuid !== event.uuid), event];
    setData({ ...data, events: newEvents });
    console.log("newEvents", newEvents);
  };

  const deleteEvent = (event: Event) => {
    console.log("deleteEvent", event);
    const newEvents = events.filter((e) => e.uuid !== event.uuid);
    setData({ ...data, events: newEvents });
    console.log("newEvents", newEvents);
  };

  const resetWithFakeData = () => {
    setData({ ...data, events: FAKE_EVENTS, things: FAKE_THINGS });
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
    resetWithFakeData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
