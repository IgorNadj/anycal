import { useLocalStorage } from "./useLocalStorage.ts";
import { Thing, Event } from "../types/types.ts";

type DbType = {
  things: Thing[];
  events: Event[];
};

const emptyDb = {
  things: [],
  events: [],
};

export const usePersistedThings = () => {
  const { value, setValue, isLoading } = useLocalStorage<DbType>(
    "anycal",
    emptyDb,
  );

  const hydratedEvents = value.events.map((event) => ({
    ...event,
    date: new Date(event.date),
  }));

  return {
    data: {
      ...value,
      events: hydratedEvents,
    },
    setData: setValue,
    isLoading: isLoading,
  };
};
