import { createContext } from "react";
import {Event, Thing } from "@anycal/types";
import { ViewMode } from "../types.ts";

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

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const AppContext = createContext<AppContextType>(null);
