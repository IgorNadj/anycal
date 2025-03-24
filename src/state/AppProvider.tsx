import { ReactNode, useState } from "react";
import { DEFAULT_VIEW_MODE } from "../constants.ts";
import { Thing, ViewMode } from "../types/types.ts";
import { usePersistedThings } from "../hooks/usePersistedThings.ts";
import { AppContext } from "./AppContext.tsx";

export type AppContextType = {
  things: Thing[];
  setThings: (things: Thing[]) => void;
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  currentlyEditingThing: Thing | null;
  setCurrentlyEditingThing: (thing: Thing | null) => void;
  addNewThingToCalendar: (thing: Thing) => void;
  saveThing: (thing: Thing) => void;
  deleteThing: (thing: Thing) => void;
};

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const { things, setThings } = usePersistedThings();
  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

  const [currentlyEditingThing, setCurrentlyEditingThing] =
    useState<Thing | null>(null);

  const addNewThingToCalendar = (thing: Thing) => {
    console.log("adding", thing);
    setThings([...things, thing]);
    console.log("things", JSON.stringify(things));
  };

  const saveThing = (thing: Thing) => {
    console.log("saving", thing);
    setThings([...things.filter((t) => t.uuid !== thing.uuid), thing]);
    console.log("things", JSON.stringify(things));
  };

  const deleteThing = (thing: Thing) => {
    console.log("deleting", thing);
    setThings(things.filter((t) => t.uuid !== thing.uuid));
    console.log("things", JSON.stringify(things));
  };

  const value: AppContextType = {
    things,
    setThings,
    viewMode,
    setViewMode,
    currentlyEditingThing,
    setCurrentlyEditingThing,
    addNewThingToCalendar,
    saveThing,
    deleteThing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
